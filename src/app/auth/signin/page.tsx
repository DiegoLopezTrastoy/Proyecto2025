"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaGitlab,
  FaGoogle,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";

export default function SignInPage() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    getCsrfToken().then((token) => {
      setCsrfToken(token!);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm max-w">
          Or
          <Link
            href={"/auth/signup"}
            className="font-medium text-blue-400 hover:text-blue-500 ml-1"
          >
            Crear una cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-brightness-[400%] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="/api/auth/callback/credentials" method="POST">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken!} />
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                className="mt-1"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="example@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                className="mt-1"
                name="password"
                type="password"
                autoComplete="password"
                required
                placeholder="Introduzca su contraseña"
              />
            </div>

            <div className="flex items-center justify-between">
                <Link
                  href={"/auth/forgot-password"}
                  className="font-medium text-blue-400 hover:text-blue-500"
                >
                  Olvidaste tu contraseña?
                </Link>
            </div>

            <div>
              <Button className="w-full" type="submit">
                Iniciar sesion
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-800">O</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/google"} prefetch={false}>
                  <FaGoogle />
                </Link>
              </Button>
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/github"} prefetch={false}>
                  <FaGithub />
                </Link>
              </Button>
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/discord"} prefetch={false}>
                  <FaDiscord />
                </Link>
              </Button>
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/twitch"} prefetch={false}>
                  <FaTwitch />
                </Link>
              </Button>
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/twitter"} prefetch={false}>
                  <FaTwitter />
                </Link>
              </Button>
              <Button asChild className="w-full h-11">
                <Link href={"/api/auth/signin/gitlab"} prefetch={false}>
                  <FaGitlab />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
