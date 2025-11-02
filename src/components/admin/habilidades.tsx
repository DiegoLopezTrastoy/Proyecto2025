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
  getSkillsForAdmin,
  newSkill,
  SkillInAdmin,
  updateSkill,
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

export default function HabilidadesAdminTab({ filter }: props) {
  let [skills, setSkills] = useState<SkillInAdmin[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<SkillInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");

  const loadSkills = () => {
    getSkillsForAdmin().then((dbSkills) => {
      setSkills(dbSkills);
      setFilteredSkills(dbSkills);
    });
  };

  useEffect(() => {
    loadSkills();
  }, []);

  useEffect(() => {
    setFilteredSkills(
      skills.filter((skill) => {
        return (
          skill.name?.includes(filter) ||
          skill._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de habilidades</CardTitle>
        <CardDescription>
          Administra las habilidades registradas en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nueva</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nueva habilidad</AlertDialogTitle>
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
                    newSkill({
                      name: newName,
                    }).then(() => {
                      loadSkills();
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
            {filteredSkills.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay hechizos registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <EditableCell
                    value={skill.name}
                    onSave={(val) => {
                      updateSkill(skill.id, { name: val });
                      loadSkills();
                    }}
                  />
                  <TableCell className="font-medium">
                    {skill.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        skill.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {skill.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{skill._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {skill.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateSkill(skill.id, { state: "INACTIVE" });
                          loadSkills();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateSkill(skill.id, { state: "ACTIVE" });
                          loadSkills();
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
