"use client";
import styles from './styles.module.css'
import { useSession } from "next-auth/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";
import { changePosition, generateBaseMap } from "./functions";

export default function Home() {
  const { data: session, /*status*/ } = useSession();
  // const status = {

  // }
  const user = session?.user;
  const userImage = useRef(null);
  const [mapa, setMapa] = useState<number[][]>([[]]);
  const alto = 100;
  const ancho = 100;
  // const PositionInMainMap = {x: 0, y: 0}
  // let enemigofinal = { x: 99, y: 99 };
  const currentPosition = { x: 0, y: 0 };
  const tabla = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setMapa(generateDungeon(ancho, alto))
    setMapa(generateBaseMap(ancho, alto))
  }, []);

  useEffect(() => {
    while (true) {
      const destinationPosition = {x: 0, y: 0};
      destinationPosition.x = Math.floor(Math.random() * ancho);
      destinationPosition.y = Math.floor(Math.random() * alto);
      if (mapa[destinationPosition.x] && mapa[destinationPosition.x][destinationPosition.y] != 1) {
        changePosition(mapa, userImage as unknown as RefObject<HTMLImageElement | SVGSVGElement>, currentPosition, destinationPosition)
        break;
      }
    }

    // enemigofinal = generateEnemyPosition(ancho, alto, currentPosition, 50);
  }, [mapa])

  return (
    <div
      id="tabla"
      ref={tabla}
      className="*:*:border-1 *:*:border-white *:grid *:grid-cols-[0px_repeat(100,_1fr)_0px] *:*:w-24 *:*:h-24 w-screen h-[calc(100vh-80px)] overflow-hidden"
    >
      {user?.image ? (
        <Image alt="jugador" width={80} height={80} ref={userImage} src={user.image} className="rounded-full w-20 h-20" />
      ) : (
        <>
          <UserCircle2 ref={userImage} className="w-20 h-20" />
        </>
      )}
      {mapa.map((x, index) => {
        return (
          <div key={index}>
            {x.map((y, index2) => {
              return (
                <div
                  className={"flex items-center justify-center "+ (y == 1 ? styles.value_1 : '')}
                  id={index + "," + index2}
                  onClick={() => changePosition(mapa, userImage as unknown as RefObject<HTMLImageElement | SVGSVGElement>, currentPosition, {x: index, y: index2})}
                  key={index + "," + index2}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
