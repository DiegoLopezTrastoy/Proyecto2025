"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Home, GamepadIcon, Shield, User, LogOut } from "lucide-react";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import { userIsAdmin } from "@/lib/header/functions";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession<any>();
  const [navItems, setNavItems] = useState([
    { href: "/", label: "Inicio", icon: Home },
    { href: "/game", label: "Juego", icon: GamepadIcon },
  ]);

  useEffect(() => {
    if (status == "authenticated") {
      userIsAdmin(session?.user.email).then((val) => {
        if (val) {
          setNavItems(prev => [...prev, { href: "/admin", label: "Admin", icon: Shield }]);
        }
      });
    }
  }, [session]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" width={50} height={50} />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(
                      "transition-all duration-200",
                      pathname === item.href &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              {status == "authenticated" ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {session?.user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Salir</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => signIn()}
                >
                  <User className="h-4 w-4" />
                  <span>Iniciar sesión</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
