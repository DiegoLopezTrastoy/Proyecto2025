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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getSpellsForAdmin, newSpell, SpellInAdmin, updateSpell } from "@/lib/prisma/prisma";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import EditableCell from "./editableCell";

interface props {
  filter: string;
}

export default function MagiasAdminTab({ filter }: props) {
  let [spells, setSpells] = useState<SpellInAdmin[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<SpellInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");

  const loadSpells = () => {
    getSpellsForAdmin().then((dbSpells) => {
      setSpells(dbSpells);
      setFilteredSpells(dbSpells);
    });
  };

  useEffect(() => {
    loadSpells();
  }, []);

  useEffect(() => {
    setFilteredSpells(
      spells.filter((spell) => {
        return (
          spell.name?.includes(filter) ||
          spell._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de hechizos</CardTitle>
        <CardDescription>
          Administra los hechizos registrados en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nuevo</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nuevo hechizo</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  autoFocus
                  placeholder="Nombre"
                  value={newName}
                  onChange={(val) => setNewName(val.target.value)}
                  className="mb-5"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (newName.length > 0) {
                    newSpell({
                      name: newName,
                    }).then(() => {
                      loadSpells();
                      setNewName("");
                    });
                  }
                }}
              >
                Crear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cantidad de personajes</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpells.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay hechizos registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredSpells.map((spell) => (
                <TableRow key={spell.id}>
                  <EditableCell
                    value={spell.name}
                    onSave={(val) => {
                      updateSpell(spell.id, { name: val });
                      loadSpells();
                    }}
                  />
                  <TableCell className="font-medium">
                    {spell.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        spell.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {spell.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{spell._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {spell.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateSpell(spell.id, { state: "INACTIVE" });
                          loadSpells();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateSpell(spell.id, { state: "ACTIVE" });
                          loadSpells();
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
