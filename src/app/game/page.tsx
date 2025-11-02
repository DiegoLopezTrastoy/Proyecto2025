"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Clock } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GameWithPersonaje, getGames } from "@/lib/prisma/prisma";

export default function GamePage() {
  const { data: session, status } = useSession();
  const [games, setGames] = useState<GameWithPersonaje[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      getGames(session.user).then((res) => {
        setGames(res ?? []);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) {
  }
  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Centro de Juego
            </h1>
            <p className="text-xl text-muted-foreground">
              Continúa una aventura existente o comienza una nueva
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link href={"/game/new"}>
              <Button
                size="lg"
                className="transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nueva Partida
              </Button>
            </Link>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>Tus Partidas</span>
            </h2>

            {games.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <Link href={"/game/"+game.id} key={game.id}>
                    <Card
                      key={game.id}
                      className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center space-x-2">
                              <span>{game.character.name}</span>
                            </CardTitle>
                            <CardDescription>
                              {game.character.race.name}{" "}
                              {game.character.class.name} - Nivel{" "}
                              {game.character.level}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              game.state === "ACTIVE" ? "default" : "secondary"
                            }
                          >
                            {game.state === "ACTIVE" ? "Activa" : "Finalizada"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            Creada:{" "}
                            {new Date(game.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          className="w-full group-hover:bg-primary/90 transition-colors cursor-pointer"
                          size="sm"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continuar Aventura
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-2 border-dashed">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Play className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      No tienes partidas activas
                    </h3>
                    <p className="text-muted-foreground">
                      ¡Comienza tu primera aventura y crea tu personaje único!
                    </p>
                  </div>
                  <Link href={"/game/new"}>
                    <Button size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Crear Primera Partida
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
