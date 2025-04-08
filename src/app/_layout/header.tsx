"use client";
import * as React from "react";
import Link from "next/link";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import { Toggle } from "@/components/ui/toggle";
import { Moon, SunIcon, MenuIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session /*status*/ } = useSession();
  const user = session?.user;

  const toggle = useRef<HTMLButtonElement>(null);
  const moon = useRef<SVGSVGElement>(null);
  const sun = useRef<SVGSVGElement>(null);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (theme === "light") {
      moon.current?.classList.add("hidden");
    } else {
      sun.current?.classList.add("hidden");
    }
  }, [theme]);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-7 pt-7">
          <DialogTitle></DialogTitle>
          <Link href="/" prefetch={false}>
            <Image
              className="not-dark:invert"
              alt="logo"
              src="/logo.svg"
              width={50}
              height={50}
            />
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Inicio
            </Link>
            <Link
              href="/game"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Jugar
            </Link>
            <Link
              href="/custom_game"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Partida personalizada
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Contacto
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image
          className="not-dark:invert"
          alt="logo"
          src="/logo.svg"
          width={50}
          height={50}
        />
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Inicio
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/game"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Jugar
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/custom_game"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Partida personalizada
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              Contacto
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        <Toggle
          ref={toggle}
          className="cursor-pointer"
          onClick={() => {
            for (const child of toggle.current?.children ?? []) {
              child.classList.toggle("hidden");
            }
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <Moon ref={moon} className="h-4 w-4" />
          <SunIcon ref={sun} className="h-4 w-4" />
        </Toggle>
        {user ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{user.email}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-36">
                    <NavigationMenuLink className="cursor-pointer">
                      Perfil
                    </NavigationMenuLink>
                    <NavigationMenuLink className="cursor-pointer">
                      Amigos
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Cerrar sesion
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Sign in</Link>
            </Button>
            <Button>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
