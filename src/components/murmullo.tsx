'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import generarMensaje from "./generateMurmullo";

export default function Murmullo() {
  let [texto, setTexto] = useState('Cargando...')

  useEffect(() => {
    generarMensaje().then(val => setTexto(val??'Error durante la carga.'));
  }, [])

  return (
    <Card>
      <CardContent className="p-4 text-center">
        <strong>{texto}</strong>
      </CardContent>
    </Card>
  );
}
