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
  ClassInAdmin,
  getClassesForAdmin,
  newClass,
  updateClass,
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
import { Label } from "../ui/label";

interface props {
  filter: string;
}

export default function ClasesAdminTab({ filter }: props) {
  let [classes, setClasses] = useState<ClassInAdmin[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newDice, setNewDice] = useState<number>(0);

  const loadClasses = () => {
    getClassesForAdmin().then((dbClasses) => {
      setClasses(dbClasses);
      setFilteredClasses(dbClasses);
    });
  };

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    setFilteredClasses(
      classes.filter((clas) => {
        return (
          clas.name?.includes(filter) ||
          clas._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de clases</CardTitle>
        <CardDescription>
          Administra las clases registradas en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nueva</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nueva clase</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  autoFocus
                  placeholder="Nombre"
                  value={newName}
                  onChange={(val) => setNewName(val.target.value)}
                />
                <Label htmlFor="dice" className="mt-5 mb-2">Dado</Label>
                <Input
                  id="dice"
                  autoFocus
                  type="number"
                  value={newDice}
                  onChange={(val) => setNewDice(Number(val.target.value))}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (newName.length > 0) {
                    newClass({ name: newName, dice: newDice }).then(() => {
                      loadClasses();
                      setNewName("");
                      setNewDice(0);
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
              <TableHead>Dado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cantidad de personajes</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay clases registradas
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses.map((clas) => (
                <TableRow key={clas.id}>
                  <EditableCell
                    value={clas.name}
                    onSave={(val) => {
                      updateClass(clas.id, { name: val });
                      loadClasses();
                    }}
                  />
                  <EditableCell
                    value={clas.dice.toString()}
                    onSave={(val) => {
                      updateClass(clas.id, { dice: Number(val) });
                      loadClasses();
                    }}
                  />
                  <TableCell className="font-medium">
                    {clas.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        clas.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {clas.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{clas._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {clas.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateClass(clas.id, { state: "INACTIVE" });
                          loadClasses();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateClass(clas.id, { state: "ACTIVE" });
                          loadClasses();
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
