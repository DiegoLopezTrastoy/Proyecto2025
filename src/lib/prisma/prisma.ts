"use server";

import { prisma } from "@/lib/prisma";
import { Game, Prisma } from "@prisma/client";
import { User } from "next-auth";

export type GameWithPersonaje = Prisma.GameGetPayload<{
  include: { character: { include: { race: true; class: true } } };
}>;

export interface UserInAdmin
  extends Prisma.UserGetPayload<{
    select: {
      email: true;
      role: true;
      name: true;
      state: true;
      id: true;
      createdAt: true;
      games: { select: { id: true } };
      accounts: { select: { provider: true } };
    };
  }> {
  hasPassword: boolean;
}

export type GameInAdmin = Prisma.GameGetPayload<{
  select: {
    id: true;
    state: true;
    createdAt: true;
    character: {
      select: { name: true; level: true; class: { select: { name: true } } };
    };
    conversations: true;
    user: { select: { email: true } };
  };
}>;

export type RaceInAdmin = Prisma.RaceGetPayload<{
  select: {
    id: true;
    name: true;
    strength: true;
    dexterity: true;
    constitution: true;
    intelligence: true;
    wisdom: true;
    charisma: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export type ClassInAdmin = Prisma.ClassGetPayload<{
  select: {
    id: true;
    name: true;
    dice: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export type EquipmentInAdmin = Prisma.EquipmentGetPayload<{
  select: {
    id: true;
    name: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export type ArmorInAdmin = Prisma.ArmorGetPayload<{
  select: {
    id: true;
    name: true;
    defense: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export type SpellInAdmin = Prisma.SpellGetPayload<{
  select: {
    id: true;
    name: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export type SkillInAdmin = Prisma.SkillGetPayload<{
  select: {
    id: true;
    name: true;
    createdAt: true;
    state: true;
    _count: { select: { characters: true } };
  };
}>;

export async function getGames(
  email: string
): Promise<GameWithPersonaje[] | null> {
  if (!email) {
    return null;
  }
  const bdUser = await prisma.user.findUnique({ where: { email } });
  return await prisma.game.findMany({
    where: { userId: bdUser?.id },
    include: { character: { include: { race: true, class: true } } },
  });
}

export async function getUsersForAdmin(): Promise<UserInAdmin[]> {
  return (
    await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        name: true,
        state: true,
        id: true,
        createdAt: true,
        password: true,
        games: { select: { id: true } },
        accounts: { select: { provider: true } },
      },
    })
  ).map(({ password, ...user }) => {
    return { ...user, hasPassword: !!(password && password.length > 0) };
  });
}

export async function disableUser(id: string) {
  return await prisma.user.update({
    where: { id },
    data: { state: "INACTIVE" },
  });
}

export async function enableUser(id: string) {
  return await prisma.user.update({ where: { id }, data: { state: "ACTIVE" } });
}

export async function getGamesForAdmin() {
  return await prisma.game.findMany({
    select: {
      id: true,
      state: true,
      createdAt: true,
      character: {
        select: { name: true, level: true, class: { select: { name: true } } },
      },
      conversations: true,
      user: { select: { email: true } },
    },
  });
}

export async function updateGame(
  id: string,
  data: Partial<Prisma.GameGetPayload<{}>>
) {
  return await prisma.game.update({ where: { id }, data });
}

export async function getRacesForAdmin() {
  return await prisma.race.findMany({
    select: {
      id: true,
      name: true,
      strength: true,
      dexterity: true,
      constitution: true,
      intelligence: true,
      wisdom: true,
      charisma: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateRace(
  id: string,
  data: Partial<Prisma.RaceGetPayload<{}>>
) {
  return await prisma.race.update({ where: { id }, data });
}

export async function newRace(data: Partial<Prisma.RaceGetPayload<{}>>) {
  return await prisma.race.create({
    data: {
      name: "",
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      ...data,
    },
  });
}

export async function getClassesForAdmin() {
  return await prisma.class.findMany({
    select: {
      id: true,
      name: true,
      dice: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateClass(
  id: string,
  data: Partial<Prisma.ClassGetPayload<{}>>
) {
  return await prisma.class.update({ where: { id }, data });
}

export async function newClass(
  data: Prisma.ClassGetPayload<{ select: { name: true; dice: true } }>
) {
  return await prisma.class.create({ data });
}

export async function getEquipamientosForAdmin() {
  return await prisma.equipment.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateEquipamiento(
  id: string,
  data: Partial<Prisma.EquipmentGetPayload<{}>>
) {
  return await prisma.equipment.update({ where: { id }, data });
}

export async function newEquipamiento(
  data: Prisma.EquipmentGetPayload<{ select: { name: true } }>
) {
  return await prisma.equipment.create({ data });
}

export async function getArmorsForAdmin() {
  return await prisma.armor.findMany({
    select: {
      id: true,
      name: true,
      defense: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateArmor(
  id: string,
  data: Partial<Prisma.ArmorGetPayload<{}>>
) {
  return await prisma.armor.update({ where: { id }, data });
}

export async function newArmor(
  data: Prisma.ArmorGetPayload<{ select: { name: true; defense: true } }>
) {
  return await prisma.armor.create({ data });
}

export async function getSpellsForAdmin() {
  return await prisma.spell.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateSpell(
  id: string,
  data: Partial<Prisma.SpellGetPayload<{}>>
) {
  return await prisma.spell.update({ where: { id }, data });
}

export async function newSpell(
  data: Prisma.SpellGetPayload<{ select: { name: true } }>
) {
  return await prisma.spell.create({ data });
}

export async function getSkillsForAdmin() {
  return await prisma.skill.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      state: true,
      _count: { select: { characters: true } },
    },
  });
}

export async function updateSkill(
  id: string,
  data: Partial<Prisma.SkillGetPayload<{}>>
) {
  return await prisma.skill.update({ where: { id }, data });
}

export async function newSkill(
  data: Prisma.SkillGetPayload<{ select: { name: true } }>
) {
  return await prisma.skill.create({ data });
}

export async function updateCharacter(
  id: string,
  data: Partial<Prisma.CharacterGetPayload<{}>>
){
  return await prisma.character.update({ where: { id }, data });
}
