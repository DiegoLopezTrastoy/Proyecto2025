"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type Race = Prisma.RaceGetPayload<{}>;
export type CharacterClass = Prisma.ClassGetPayload<{}>;

export async function getRaces() {
  return await prisma.race.findMany();
}

export async function getClasses() {
  return await prisma.class.findMany();
}

export async function newCharacterGame(
  character: Partial<Prisma.CharacterGetPayload<{}>>,
  userEmail: string
) {
  const race = await prisma.race.findUnique({
    where: { id: character.raceId },
  });
  const characterClass = await prisma.class.findUnique({
    where: { id: character.classId },
  });
  character = {
    ...character,
    ...calcStats(characterClass?.dice ?? 6, race!),
  };
  character.hp = (characterClass?.dice ?? 6) + (character.constitution ?? 0);
  character.currentHp = character.hp;
  const dbCharacter = await prisma.character.create({
    data: character as Prisma.CharacterGetPayload<{}>,
  });
  return await prisma.game.create({
    data: {
      character: { connect: { id: dbCharacter.id } },
      user: { connect: { email: userEmail } },
    },
  });
}

const stats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] satisfies (keyof Partial<
  Prisma.CharacterGetPayload<{}>
>)[] satisfies (keyof Partial<Prisma.RaceGetPayload<{}>>)[];

function calcStats(
  dice: number,
  race: Prisma.RaceGetPayload<{}>
): Partial<Prisma.CharacterGetPayload<{}>> {
  const result: Partial<Prisma.CharacterGetPayload<{}>> = {};
  stats.forEach((val) => {
    result[val] = calcStat(dice) + (race[val] ?? 0);
  });
  return result;
}

function calcStat(dice: number): number {
  const results = Array.from({ length: 4 }).map(() => throwDice(dice));
  results.sort((a, b) => b - a).pop();
  return results.reduce((acumulado, val) => acumulado + val, 0);
}

function throwDice(faces: number) {
  return Math.floor(Math.random() * faces) + 1;
}
