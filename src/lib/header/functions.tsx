'use server'

import { prisma } from "../prisma";

export async function userIsAdmin(email?: string | null) {
  if (email) {
    const result = await prisma.user.findUnique({where: { email, role: "ADMIN" }});
    return !!result;
  }
  return false;
}