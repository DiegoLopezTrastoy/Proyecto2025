"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Recuperar contraseña
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-100 dark:bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="/api/auth/reset-password" method="POST">
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
              <Button className="w-full" type="submit">
                Recuperar contraseña
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
