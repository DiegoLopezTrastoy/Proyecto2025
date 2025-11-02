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
import { EquipmentInAdmin, getEquipamientosForAdmin, newEquipamiento, updateEquipamiento } from "@/lib/prisma/prisma";
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

export default function EquipamientosAdminTab({ filter }: props) {
  let [equipamientos, setEquipamientos] = useState<EquipmentInAdmin[]>([]);
  const [filteredEquipamientos, setFilteredEquipamientos] = useState<EquipmentInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");

  const loadEquipamientos = () => {
    getEquipamientosForAdmin().then((dbEquipamientos) => {
      setEquipamientos(dbEquipamientos);
      setFilteredEquipamientos(dbEquipamientos);
    });
  };

  useEffect(() => {
    loadEquipamientos();
  }, []);

  useEffect(() => {
    setFilteredEquipamientos(
      equipamientos.filter((equipment) => {
        return (
          equipment.name?.includes(filter) ||
          equipment._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de equipamientos</CardTitle>
        <CardDescription>
          Administra los equipamientos registrados en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nuevo</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nuevo equipamiento</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  autoFocus
                  placeholder="Nombre"
                  value={newName}
                  onChange={(val) => setNewName(val.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (newName.length > 0) {
                    newEquipamiento({ name: newName }).then(() => {
                      loadEquipamientos();
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
            {filteredEquipamientos.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay equipamientos registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredEquipamientos.map((equipamiento) => (
                <TableRow key={equipamiento.id}>
                  <EditableCell
                    value={equipamiento.name}
                    onSave={(val) => {
                      updateEquipamiento(equipamiento.id, { name: val });
                      loadEquipamientos();
                    }}
                  />
                  <TableCell className="font-medium">
                    {equipamiento.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        equipamiento.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {equipamiento.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{equipamiento._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {equipamiento.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateEquipamiento(equipamiento.id, { state: "INACTIVE" });
                          loadEquipamientos();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateEquipamiento(equipamiento.id, { state: "ACTIVE" });
                          loadEquipamientos();
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
