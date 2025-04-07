"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function SignIn() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <h2>Inicio de sesión</h2>
      <form className="flex flex-col w-[40vw]">
        <label htmlFor="username" className="text-left mb-2">
          Username:
        </label>
        <InputText id="username" type="text" />
        <label htmlFor="password" className="text-left mb-2 mt-5">
          Password:
        </label>
        <Password id="password" className="*:w-full mb-5" />

        <Button
          label="Inicio de sesion"
          icon="pi pi-check"
          onClick={() => {}}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
          className="mt-5 group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        >
          <div className="relative flex items-center space-x-4 justify-around">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="absolute left-0 w-5"
              alt="google logo"
            />
            <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            Iniciar sesión con Google
            </span>
          </div>
        </button>
      </form>
      <Button onClick={() => signIn("github")}>
        Iniciar sesión con GitHub
      </Button>
    </div>
  );
}
