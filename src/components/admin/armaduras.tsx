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
import {
  ArmorInAdmin,
  getArmorsForAdmin,
  newArmor,
  updateArmor,
} from "@/lib/prisma/prisma";
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

export default function ArmadurasAdminTab({ filter }: props) {
  let [armors, setArmors] = useState<ArmorInAdmin[]>([]);
  const [filteredArmors, setFilteredArmors] = useState<ArmorInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newDefense, setNewDefense] = useState<number>(0);

  const loadArmors = () => {
    getArmorsForAdmin().then((dbArmors) => {
      setArmors(dbArmors);
      setFilteredArmors(dbArmors);
    });
  };

  useEffect(() => {
    loadArmors();
  }, []);

  useEffect(() => {
    setFilteredArmors(
      armors.filter((armor) => {
        return (
          armor.name?.includes(filter) ||
          armor._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de armaduras</CardTitle>
        <CardDescription>
          Administra las armaduras registradas en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nueva</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nueva armadura</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  autoFocus
                  placeholder="Nombre"
                  value={newName}
                  onChange={(val) => setNewName(val.target.value)}
                  className="mb-5"
                />
                <Input
                  autoFocus
                  type="number"
                  placeholder="Defensa"
                  value={newDefense}
                  onChange={(val) => setNewDefense(Number(val.target.value))}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (newName.length > 0) {
                    newArmor({
                      name: newName,
                      defense: newDefense,
                    }).then(() => {
                      loadArmors();
                      setNewName("");
                      setNewDefense(0);
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
              <TableHead>Defensa</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cantidad de personajes</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArmors.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay armaduras registradas
                </TableCell>
              </TableRow>
            ) : (
              filteredArmors.map((armor) => (
                <TableRow key={armor.id}>
                  <EditableCell
                    value={armor.name}
                    onSave={(val) => {
                      updateArmor(armor.id, { name: val });
                      loadArmors();
                    }}
                  />
                  <EditableCell
                    value={armor.defense.toString()}
                    onSave={(val) => {
                      updateArmor(armor.id, { defense: Number(val) });
                      loadArmors();
                    }}
                  />
                  <TableCell className="font-medium">
                    {armor.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        armor.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {armor.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{armor._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {armor.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateArmor(armor.id, { state: "INACTIVE" });
                          loadArmors();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateArmor(armor.id, { state: "ACTIVE" });
                          loadArmors();
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
