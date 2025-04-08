"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <h2>Inicio de sesión</h2>
      <form className="flex flex-col w-[40vw]">
        <Label className="mb-2 mt-5" htmlFor="email">
          Email
        </Label>
        <Input type="email" id="email" placeholder="Email" />
        <Label className="mb-2 mt-5" htmlFor="password">
          Contraseña
        </Label>
        <Input type="password" id="password" placeholder="Contraseña" />

        <Button
          className="mt-5 font-semibold text-sm sm:text-base h-10 hover:cursor-pointer"
          onClick={() => {}}
        >
          Inicio de sesion
        </Button>

        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            signIn("github");
          }}
          className="mt-5 font-semibold text-sm sm:text-base h-12 hover:cursor-pointer rounded-full w-full hover:border-blue-600 border-2"
        >
          <Image
            src="/google-color.svg"
            className="float left-0 w-5"
            alt="github logo"
            width={20}
            height={20}
          />
          Iniciar sesión con Google
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            signIn("github");
          }}
          className="mt-5 font-semibold text-sm sm:text-base h-12 hover:cursor-pointer rounded-full w-full hover:border-neutral-900 border-2"
        >
          <Image
            src="/github.png"
            className="float left-0 w-5 dark:invert"
            alt="github logo"
            width={20}
            height={20}
          />
          Iniciar sesión con GitHub
        </Button>
      </form>
    </div>
  );
}
