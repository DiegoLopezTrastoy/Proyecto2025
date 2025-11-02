"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUser } from "@/lib/auth/register";
import { LogIn, UserPlus } from "lucide-react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaGitlab,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { Alert } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const [alertContent, setAlertContent] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    getCsrfToken().then((token) => {
      setCsrfToken(token!);
    });

    if (error) {
      setAlertContent("Error en el inicio de sesión.");
    }
  }, []);

  // Variables y funciones dummy agregadas para evitar errores
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      <Alert
        variant="destructive"
        className={alertContent ? "text-center" : "hidden"}
      >
        {alertContent}
      </Alert>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              D&D Adventure Master
            </CardTitle>
            <CardDescription>
              Inicia sesión o crea una cuenta para comenzar tu aventura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="login"
              className="w-full"
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val);
                setAlertContent("");
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      loginData.email.length > 0 &&
                      loginData.password.length > 0
                    ) {
                      signIn("credentials", {
                        email: loginData.email,
                        password: loginData.password,
                        signUp: false,
                        callbackUrl: "/",
                      });
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      loginData.username.length > 0 &&
                      loginData.email.length > 0 &&
                      loginData.password.length > 0 &&
                      loginData.confirmPassword.length > 0
                    ) {
                      createUser({
                        username: loginData.username,
                        email: loginData.email,
                        password: loginData.password,
                        confirmPassword: loginData.confirmPassword,
                      }).then((result) => {
                        if (!result) {
                          setAlertContent(
                            "Los datos insertados no son correctos."
                          );
                        } else {
                          setAlertContent("");
                          setActiveTab("login");
                        }
                      });
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input
                      id="username"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirmar Contraseña
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={loginData.confirmPassword}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Crear Cuenta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6 grid grid-cols-6 gap-3">
              <Button
                className="w-full col-span-2 h-11 hover:cursor-pointer"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <FaGoogle />
                Google
              </Button>
              <Button
                className="w-full col-span-2 h-11 hover:cursor-pointer"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <FaGithub />
                GitHub
              </Button>
              <Button
                className="w-full col-span-2 h-11 hover:cursor-pointer"
                onClick={() => signIn("discord", { callbackUrl: "/" })}
              >
                <FaDiscord />
                Discord
              </Button>
              <Button
                className="w-full col-span-3 h-11 hover:cursor-pointer"
                onClick={() => signIn("twitter", { callbackUrl: "/" })}
              >
                <FaTwitter />
                Twitter
              </Button>
              <Button
                className="w-full col-span-3 h-11 hover:cursor-pointer"
                onClick={() => signIn("gitlab", { callbackUrl: "/" })}
              >
                <FaGitlab />
                GitLab
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
