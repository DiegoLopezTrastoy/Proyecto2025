"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

interface User {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export async function createUser(user: User) {

  const {username, email, password, confirmPassword} = user;
  
  if (username.length > 0 && email.length > 0 && password.length > 0 && password == confirmPassword) {
    const dbUser = await prisma.user.findUnique({where: {email}});
    if (!!dbUser) {
      return null
    } else {
      return await prisma.user.create({
        data: {
          name: username,
          email,
          state: "ACTIVE",
          role: "USER",
          password: await bcrypt.hash(password, 10)
        },
      })
    }
  }
}