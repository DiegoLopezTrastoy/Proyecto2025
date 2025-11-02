"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Dice6,
  Heart,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Conversation, Prisma } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { addMessage, Game, getGame, questionToIA } from "@/lib/game/game";

const initialMessages: Conversation[] = [
  {
    id: "1",
    userOrIa: "SYSTEM",
    message:
      "Bienvenido a tu aventura de D&D. Tu personaje ha sido cargado y estás listo para continuar.",
    createdAt: new Date(),
    gameId: "",
  },
  {
    id: "2",
    userOrIa: "IA",
    message:
      "Te encuentras en la entrada de una cueva misteriosa. Las sombras danzan en las paredes rocosas, y puedes escuchar un eco lejano que parece ser... ¿voces? El aire se siente pesado con una energía antigua. ¿Qué deseas hacer?",
    createdAt: new Date(),
    gameId: "",
  },
];

export default function playGame() {
  const params = useParams<{ id: string }>();
  const gameId = params.id;
  const [game, setGame] = useState<Game>();
  const [conversations, setConversations] =
    useState<Conversation[]>(initialMessages);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const dbGame = await getGame(gameId);
      if (dbGame) {
        setGame(dbGame);
        setIsPageLoading(false);
      }
    })();
  }, []);

  const sendMessage = async () => {
    if ((!!currentMessage.trim() || !isLoading) && game) {
      const dbConversation = await addMessage(gameId, currentMessage, "USER");
      if (!dbConversation) {
        setConversations((prev) => [
          ...prev,
          {
            id: "1",
            message: "Ha ocurrido un error, si el error persiste contactenos.",
            userOrIa: "SYSTEM",
            createdAt: new Date(),
            gameId,
          },
        ]);
        return;
      }
      setConversations((prev) => [...prev, dbConversation]);
      setIsLoading(true);
      
      questionToIA(currentMessage, game).then(response => {
        console.log(response);
        setIsLoading(false);
      });
      setCurrentMessage("");

      // const aiResponse: Conversation = {
      //   id: (Date.now() + 1).toString(),
      //   userOrIa: "IA",
      //   message: generateAIResponse(currentMessage),
      //   createdAt: new Date(),
      //   gameId,
      // };

      // setConversations((prev) => [...prev, aiResponse]);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Te adentras cautelosamente. La cueva se abre ante ti revelando un pasillo que se bifurca. A la izquierda escuchas el goteo del agua, a la derecha un susurro casi imperceptible.",
      "El eco de tus pasos resuena en la caverna. Notas grabados antiguos en las paredes que parecen contar una historia de aventureros que pasaron por aquí hace mucho tiempo.",
      "Un murciélago sale volando súbitamente de las sombras, pero no parece hostil. En la distancia, ves un débil resplandor que podría ser luz natural... o algo más misterioso.",
      "El suelo cruje bajo tus pies. Tu antorcha ilumina esqueletos esparcidos, pero también algo que brilla entre ellos. ¿Te arriesgarás a investigar?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isPageLoading) {
    if (game) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[80vh]">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => redirect("/game")}
                  className="w-fit -ml-2 mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                <CardTitle className="text-lg">{game.character.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Badge variant="outline">{game.character.race.name}</Badge>
                  <Badge variant="outline">{game.character.class.name}</Badge>
                  <Badge>Niv. {game.character.level}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Heart className="w-5 h-5 mx-auto mb-1 text-red-500" />
                    <div className="text-sm font-medium">
                      {game.character.currentHp}/{game.character.hp}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Puntos de Vida
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Shield className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-medium">
                      {game.character.armor?.name ?? "Sin armadura"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Clase de Armadura
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Características</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>FUE:</span>
                      <span className="font-mono">
                        {game.character.strength}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>DES:</span>
                      <span className="font-mono">
                        {game.character.dexterity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CON:</span>
                      <span className="font-mono">
                        {game.character.constitution}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>INT:</span>
                      <span className="font-mono">
                        {game.character.intelligence}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAB:</span>
                      <span className="font-mono">{game.character.wisdom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CAR:</span>
                      <span className="font-mono">
                        {game.character.charisma}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Dice6 className="w-4 h-4 mr-2" />
                    Tirar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Aventura Interactiva</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4 max-h-[65vh]">
                  <div className="space-y-4">
                    {conversations.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.userOrIa == "USER"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] p-3 rounded-lg",
                            message.userOrIa == "USER"
                              ? "bg-primary text-primary-foreground"
                              : message.userOrIa === "IA"
                              ? "bg-muted"
                              : "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                          )}
                        >
                          <div className="flex items-start space-x-2">
                            {message.userOrIa === "IA" && (
                              <Bot className="w-5 h-5 mt-1 text-blue-500" />
                            )}
                            {message.userOrIa === "USER" && (
                              <User className="w-5 h-5 mt-1" />
                            )}
                            {message.userOrIa === "SYSTEM" && (
                              <Zap className="w-5 h-5 mt-1 text-blue-500" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">
                                {message.message}
                              </p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.createdAt!.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-5 h-5 text-blue-500" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-current rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-current rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                    <form
                      className="flex space-x-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                    >
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Describe tu acción..."
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={!currentMessage.trim() || isLoading}
                        size="icon"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-[calc(100vh-130px)] flex items-center justify-center text-center">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                La partida que intentas jugar no existe
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-muted-foreground">
              La url a la que esta intentando acceder es incorrecta o la partda
              que intenta jugar no existe, si el error persiste, contactenos.
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={"/"}>
                <Button variant="outline">Inicio</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      );
    }
  } else {
    const frase = "Loading...";
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <p className="text-center animate-bounce">{frase}</p>
      </div>
    );
  }
}
