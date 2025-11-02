"use client";

import {
  CharacterClass,
  getClasses,
  getRaces,
  newCharacterGame,
  Race,
} from "@/lib/game/newGame";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function newGame() {
  const { data: session } = useSession()
  const [name, setName] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [characterClass, setCharacterClass] = useState<string>("");
  const [races, setRaces] = useState<Race[]>([]);
  const [classes, setClasses] = useState<CharacterClass[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getRaces().then(setRaces);
    getClasses().then(setClasses);
  }, []);

  const onSubmit = async () => {
    if (name.length <= 0 || race.length <= 0 || characterClass.length <= 0) {
      setError("Todos los campos son obligatorios.");
    } else {
      if (session && session.user && session.user.email) {
        const game = await newCharacterGame({ name, raceId: race, classId: characterClass }, session.user.email);
        redirect("/game/"+game.id);
      }
      else {
        setError("Ha ocurrido un error, tu usuario no es correcto.")
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Alert variant="destructive" className={error?"text-center":"hidden"}>
        <AlertTitle>{error}</AlertTitle>
      </Alert>
      <Card className="w-full max-w-sm h-max mt-24">
        <CardHeader>
          <CardTitle>Creación de un nuevo personaje</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-5 mt-5">
          <Input className="col-span-2" placeholder="Nombre" type="text" value={name} onChange={val => setName(val.target.value)} />
          <Select value={race} onValueChange={setRace}>
            <SelectTrigger>
              <SelectValue placeholder="Raza" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {races.map((race) => (
                  <SelectItem key={race.id} value={race.id}>
                    {race.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={characterClass} onValueChange={setCharacterClass}>
            <SelectTrigger>
              <SelectValue placeholder="Clase" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {classes.map((characterClass) => (
                  <SelectItem key={characterClass.id} value={characterClass.id}>
                    {characterClass.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={onSubmit} className="w-full">
            Crear personaje
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
