"use server";

import { Prisma, UserOrIa } from "@prisma/client";
import { prisma } from "../prisma";
import { zodToJsonSchema } from "zod-to-json-schema";
import { FunctionCallingConfigMode, GoogleGenAI, Type } from "@google/genai";
import { updateCharacter } from "../prisma/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type Game = Prisma.GameGetPayload<{
  include: {
    conversations: true;
    character: {
      include: {
        armor: true;
        class: true;
        equipment: true;
        race: true;
        skills: true;
        spells: true;
      };
    };
  };
}>;

export const getGame = async (id: string) => {
  if (id.length > 0) {
    return await prisma.game.findUnique({
      where: { id },
      include: {
        conversations: true,
        character: {
          include: {
            armor: true,
            class: true,
            equipment: true,
            race: true,
            skills: true,
            spells: true,
          },
        },
      },
    });
  } else {
    return null;
  }
};

export const addMessage = async (
  gameId: string,
  message: string,
  userOrIa: UserOrIa
) => {
  if (gameId.length > 0 && message.length > 0) {
    return await prisma.conversation.create({
      data: { message, game: { connect: { id: gameId } }, userOrIa },
    });
  }
};

export const questionToIA = async (message: string, game: Game) => {
  if (message.length > 0) {
    const actualizarPersonajeFunction = {
      name: "actualizar_personaje",
      description: "Actualiza los datos de un personaje en la base de datos",
      parameters: {
        type: Type.OBJECT,
        properties: {
          data: {
            type: Type.OBJECT,
            description: "Datos a actualizar del personaje",
            properties: {
              name: { type: Type.STRING },
              id: { type: Type.STRING },
              raceId: { type: Type.STRING },
              classId: { type: Type.STRING },
              level: { type: Type.INTEGER },
              hp: { type: Type.INTEGER },
              currentHp: { type: Type.INTEGER },
              strength: { type: Type.INTEGER },
              dexterity: { type: Type.INTEGER },
              constitution: { type: Type.INTEGER },
              intelligence: { type: Type.INTEGER },
              wisdom: { type: Type.INTEGER },
              charisma: { type: Type.INTEGER },
              armorId: { type: Type.STRING },
              initiative: { type: Type.INTEGER },
              equipmentId: { type: Type.STRING },
              backstory: { type: Type.STRING },
            },
          },
        },
        required: ["data"],
      },
    };
    const tools = [
      {
        functionDeclarations: [actualizarPersonajeFunction],
      },
    ];
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Eres un dungeon master de un juego dnd con una interfaz de texto, posteriormente te paso los datos del personaje y finalmente el mensaje del usuario, nunca te salgas del personaje.",
            },
            { text: JSON.stringify(game.character) },
          ],
        },
        ...game.conversations.map((val) => {
          return {
            role: val.userOrIa == UserOrIa.IA ? "model" : "user",
            parts: [{ text: val.message }],
          };
        }),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      config: {
        tools,
        toolConfig: {
          functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO },
        },
      },
    });

    if (result.functionCalls && result.functionCalls.length > 0) {
      for (const call of result.functionCalls) {
        if (call.name === "actualizar_personaje" && call.args) {
          if (
            typeof call.args === "object" &&
            call.args !== null &&
            "data" in call.args
          ) {
            const args = call.args as any;
            if (args.data && typeof args.data === "object") {
              if ("id" in args.data && args.data.id) {
                var { id, ...character } = args.data;
              } else {
                var character = args.data;
              }
              const personajeActualizado = await updateCharacter(
                game.characterId,
                character
              );

              const followUp = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: "Eres un dungeon master de un juego dnd con una interfaz de texto, posteriormente te paso los datos del personaje y finalmente el mensaje del usuario, nunca te salgas del personaje.",
                      },
                      { text: JSON.stringify(game.character) },
                    ],
                  },
                  ...game.conversations.map((val) => {
                    return {
                      role: val.userOrIa == UserOrIa.IA ? "model" : "user",
                      parts: [{ text: val.message }],
                    };
                  }),
                  {
                    role: "user",
                    parts: [{ text: message }],
                  },
                  {
                    parts: [
                      {
                        functionResponse: {
                          name: call.name,
                          response: personajeActualizado,
                        },
                      },
                    ],
                  },
                ],
              });

              return followUp.text ?? "Ha ocurrido un error";
            }
          }
        }
      }
    }

    return result.text ?? "Ha ocurrido un error";
  }
  return "No puedes enviar un texto vacio.";
};
