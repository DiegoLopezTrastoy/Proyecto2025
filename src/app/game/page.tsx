"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { UserCircle2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { data: session, /*status*/ } = useSession();
  const user = session?.user;
  const userImage = useRef(null);
  const [mapa, setMapa] = useState<number[][]>([[]]);
  const alto = 100;
  const ancho = 100;
  // const enemigofinal = { x: 99, y: 99 };
  const currentPosition = { x: 0, y: 0 };
  const tabla = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map: number[][] = [];
    for (let i = 0; i < alto; i++) {
      map[i] = [];
      for (let j = 0; j < ancho; j++) {
        map[i][j] = 0;
      }
    }
    setMapa(map);
  }, []);

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
                  className="flex items-center justify-center"
                  id={index2 + ", " + index}
                  onClick={(e) => {
                    if ((currentPosition.x + 1 == index2 || currentPosition.x -1 == index2) && (currentPosition.y !== 0)) {
                      document.getElementById(currentPosition.x + ", " + currentPosition.y)?.removeChild(userImage.current!);
                      
                    }
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    currentPosition.x = index2;
                    currentPosition.y = index;
                    console.log(currentPosition);
                    document.getElementById(currentPosition.x +", " + currentPosition.y)?.appendChild(userImage.current!);
                  }}
                  key={index + ", " + index2}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
