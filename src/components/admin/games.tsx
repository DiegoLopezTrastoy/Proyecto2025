"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  GameInAdmin,
  getGamesForAdmin,
  updateGame,
} from "@/lib/prisma/prisma";
import { Badge } from "../ui/badge";

interface props {
  filter: string;
}

export default function GamesAdminTab({ filter }: props) {
  const [games, setGames] = useState<GameInAdmin[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameInAdmin[]>([]);

  const loadGames = () => {
    getGamesForAdmin().then((dbSkills) => {
      setGames(dbSkills);
      setFilteredGames(dbSkills);
    });
  };

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    setFilteredGames(
      games.filter((game) => {
        return (
          game.user.email?.includes(filter) ||
          game.character.name.toString()?.includes(filter) ||
          game.character.class.toString()?.includes(filter) ||
          game.createdAt.toString()?.includes(filter) ||
          game.state.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de partidas</CardTitle>
        <CardDescription>
          Administra las partidas registradas en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Personaje</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGames.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay partidas registradas
                </TableCell>
              </TableRow>
            ) : (
              filteredGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">
                    {game.user.email}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge variant={"outline"}>{game.character.name}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{game.character.class.name}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{game.character.level}</Badge>
                  </TableCell>
                  <TableCell className="font-medium"><Badge variant={game.state == "ACTIVE" ? "outline" : "destructive"}>{game.state}</Badge></TableCell>
                  <TableCell className="font-medium">
                    {game.createdAt.toISOString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {game.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateGame(game.id, { state: "INACTIVE" });
                          loadGames();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateGame(game.id, { state: "ACTIVE" });
                          loadGames();
                        }}
                      >
                        Activar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
