"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Recuperar contraseña
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-100 dark:bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="/api/auth/signup" method="POST">
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
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                required
                placeholder="Introduzca su contraseña"
              />
            </div>

            <div>
              <Label htmlFor="password2" className="block text-sm font-medium">
                Repetir contraseña
              </Label>
              <Input
                id="password2"
                className="mt-1"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                type="password"
                autoComplete="password2"
                required
                placeholder="Repita su contraseña"
              />
            </div>

            <div>
              <Button
                className="w-full"
                type="submit"
                onClick={(e) => {
                  if (password1 !== password2) {
                    e.preventDefault();
                    toast.error("Las contraseñas no coinciden.");
                  }
                }}
              >
                Crear cuenta
              </Button>

              <Toaster position="bottom-center" richColors duration={1500}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
