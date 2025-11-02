'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, signOut } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error");
  const [content, setContent] = useState({
    title: "",
    content: "",
    buttonText: "",
    buttonAction: () => {},
  });

  useEffect(() => {
    if (error == "Configuration") {
      setContent({
        title: "Ha ocurrido un error.",
        content:
          "Si el problema persiste, vuelve a intentarlo dentro de unas horas",
        buttonText: "Inicio",
        buttonAction: () => redirect("/"),
      });
    } else if (error == "AccessDenied") {
      setContent({
        title: "Acceso denegado.",
        content: "No tienes permiso para iniciar sesión.",
        buttonText: "Iniciar sesión",
        buttonAction: () => {signIn()},
      });
    } else if (error == "Verification") {
      setContent({
        title: "El token no es valido",
        content: "Inicie sesión nuevamente y vuelva ha intentarlo.",
        buttonText: "Inicio de sesión",
        buttonAction: () => {
          signOut();
          signIn();
        },
      });
    } else {
      setContent({
        title: "Ha ocurrido un error.",
        content:
          "Si el problema persiste, vuelve a intentarlo dentro de unas horas",
        buttonText: "Inicio",
        buttonAction: () => redirect("/"),
      });
    }
  }, [])

  return (<div className="min-h-[calc(100vh-130px)] flex items-center justify-center text-center">
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg text-muted-foreground">{content.content}</CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={content.buttonAction}>{content.buttonText}</Button>
      </CardFooter>
    </Card>
  </div>);
}
