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
  RaceInAdmin,
  getRacesForAdmin,
  newRace,
  updateRace,
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
import { Prisma } from "@prisma/client";
import { Label } from "../ui/label";

interface props {
  filter: string;
}

export default function RazasAdminTab({ filter }: props) {
  let [races, setRaces] = useState<RaceInAdmin[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<RaceInAdmin[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newStats, setNewStats] = useState<Partial<Prisma.RaceGetPayload<{}>>>(
    {}
  );

  const loadRaces = () => {
    getRacesForAdmin().then((dbRaces) => {
      setRaces(dbRaces);
      setFilteredRaces(dbRaces);
    });
  };

  useEffect(() => {
    loadRaces();
  }, []);

  useEffect(() => {
    setFilteredRaces(
      races.filter((race) => {
        return (
          race.name?.includes(filter) ||
          race._count.characters.toString()?.includes(filter)
        );
      })
    );
  }, [filter]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>Gestión de razas</CardTitle>
        <CardDescription>
          Administra las razas registradas en la plataforma
        </CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-7 right-7">Nueva</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nueva raza</AlertDialogTitle>
              <Input
                autoFocus
                placeholder="Nombre"
                value={newName}
                onChange={(val) => setNewName(val.target.value)}
              />
              <div className="grid grid-cols-3 gap-7 my-5">
                <div className="space-y-2">
                  <Label htmlFor="strength">Fuerza</Label>
                  <Input
                    autoFocus
                    id="strength"
                    type="number"
                    placeholder="Fuerza"
                    value={newStats.strength ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          strength: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dexterity">Destreza</Label>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Destreza"
                    value={newStats.dexterity ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          dexterity: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constitution">Constitución</Label>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Constitución"
                    value={newStats.constitution ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          constitution: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intelligence">Inteligencia</Label>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Inteligencia"
                    value={newStats.intelligence ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          intelligence: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wisdom">Sabiduría</Label>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Sabiduría"
                    value={newStats.wisdom ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          wisdom: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="charisma">Carisma</Label>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Carisma"
                    value={newStats.charisma ?? 0}
                    onChange={(val) =>
                      setNewStats((prev) => {
                        return {
                          ...prev,
                          charisma: Number(val.target.value),
                        };
                      })
                    }
                  />
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                onClick={() => {
                  if (newName.length > 0) {
                    newRace({ name: newName, ...newStats }).then(() => {
                      loadRaces();
                      setNewName("");
                      setNewStats({});
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
              <TableHead>Fuerza</TableHead>
              <TableHead>Destreza</TableHead>
              <TableHead>Constitución</TableHead>
              <TableHead>Inteligencia</TableHead>
              <TableHead>Sabiduría</TableHead>
              <TableHead>Carisma</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Cantidad de personajes</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRaces.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center text-gray-500 pt-8 text-xl"
                >
                  No hay razas registradas
                </TableCell>
              </TableRow>
            ) : (
              filteredRaces.map((race) => (
                <TableRow key={race.id}>
                  <EditableCell
                    value={race.name}
                    onSave={(val) => {
                      updateRace(race.id, { name: val });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.strength?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { strength: Number(val) });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.dexterity?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { dexterity: Number(val) });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.constitution?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { constitution: Number(val) });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.intelligence?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { intelligence: Number(val) });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.wisdom?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { wisdom: Number(val) });
                      loadRaces();
                    }}
                  />
                  <EditableCell
                    value={race.charisma?.toString() ?? "0"}
                    type="number"
                    onSave={(val) => {
                      updateRace(race.id, { charisma: Number(val) });
                      loadRaces();
                    }}
                  />
                  <TableCell className="font-medium">
                    {race.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge
                      variant={
                        race.state == "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {race.state == "ACTIVE" ? "Activo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge>{race._count.characters}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {race.state == "ACTIVE" ? (
                      <Button
                        onClick={() => {
                          updateRace(race.id, { state: "INACTIVE" });
                          loadRaces();
                        }}
                      >
                        Desactivar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          updateRace(race.id, { state: "ACTIVE" });
                          loadRaces();
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
