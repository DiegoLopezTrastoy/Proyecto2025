'use server'

import { GoogleGenAI } from "@google/genai";
import { headers } from "next/headers";

export default async function generarMensaje() {
  const header = await headers();
  const ip = header.get("x-forwarded-for");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const geolocation = await fetch("http://ip-api.com/json/" + ip);
    const position = await geolocation.json();
    const sunResponse = await fetch(
      "https://api.sunrise-sunset.org/json?lat=" +
        position.lat +
        "&lng=" +
        position.lon
    );
    const sun = await sunResponse.text();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Actúa como un narrador de Dungeons & Dragons con un tono épico, inmersivo y ligeramente poético.

Tu tarea es generar un mensaje corto (entre 2 y 5 frases) para mostrar en una página web. 
El mensaje debe estar ambientado en el universo de fantasía de D&D, incluyendo elementos como aventuras, gremios, hechicería, tabernas, bestias o misiones, según el contexto.

Recibirás datos del visitante en formato JSON. Usa esos datos para adaptar el mensaje al contexto, 
manteniendo siempre coherencia temática y tono de narrador o maestro del calabozo (Dungeon Master).`,
            },{
              text: sun
            }
          ],
        },
      ],
    });
    return response.text;
    // return sun.results;
  } catch (error) {
    console.error(error);
    return "";
  }
}