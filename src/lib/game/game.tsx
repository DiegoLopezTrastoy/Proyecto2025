"use server";

import { Prisma, UserOrIa } from "@prisma/client";
import { prisma } from "../prisma";
import ollama from "ollama";

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
    // Tarda demasiado en contestar y nginx cierra la conexión, Probar con Server Send Messages.
    return await ollama.chat({
      model: "phi3:mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un dungeon master de un juego dnd con una interfaz de texto, posteriormente te paso los datos de la partida y finalment el mensaje del usuario, la respuesta quiero que esté en el siguiente formato JSON {message: (es el mensaje que se le mostrará al usuario), character: (será un objeto en el formato del campo character contenido en los datos de la partida pero con los cambios que ocurrieron.)}",
        },
        { role: "system", content: JSON.stringify(game) },
        { role: "user", content: message },
      ],
    });
  }
};
