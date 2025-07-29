import { RefObject } from "react";
import { Map } from "rot-js";

type Position = {
  x: number,
  y: number
}

export const generateBaseMap = (width: number, height: number) => {
  const map = new Map.Arena(width, height);
  // Mapa vacío para almacenar los datos
  const grid = Array.from({ length: height }, () =>
    Array(width).fill(0)
  );

  // Generar el mapa
  map.create((x, y, value) => {
    // value = 0 -> Piso
    // value = 1 -> Pared
    grid[y][x] = value;
  });

  return grid;
};

export const generateDungeon = (width: number, height: number) => {
  const map = new Map.Digger(width, height, { dugPercentage: 20 });

  // Mapa vacío para almacenar los datos
  const grid = Array.from({ length: height }, () =>
    Array(width).fill(0)
  );

  // Generar el mapa
  map.create((x, y, value) => {
    // value = 0 -> Piso
    // value = 1 -> Pared
    grid[y][x] = value;
  });

  return grid;
};

export const changePosition = (mapa: number[][], userImage: RefObject<HTMLImageElement | SVGSVGElement>, currentPosition: Position, destinationPosition: Position) => {
  if (mapa[destinationPosition.x][destinationPosition.y] != 1) {
    if ((currentPosition.x + 1 == destinationPosition.y || currentPosition.x - 1 == destinationPosition.y) && (currentPosition.y !== 0)) {
      document.getElementById(currentPosition.x + "," + currentPosition.y)?.removeChild(userImage.current!);

    }
    document.getElementById(destinationPosition.x + ',' + destinationPosition.y)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    currentPosition.y = destinationPosition.y;
    currentPosition.x = destinationPosition.x;
    document.getElementById(currentPosition.x + "," + currentPosition.y)?.appendChild(userImage.current!);
  }
}



const euclideanDistance = (pos1: Position, pos2: Position): number => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

export const generateEnemyPosition = (
  mapSizeX: number,
  mapSizeY: number,
  playerPosition: Position,
  minDistance: number
): Position => {
  let enemyPosition: Position;

  do {
    enemyPosition = {
      x: Math.floor(Math.random() * mapSizeX),
      y: Math.floor(Math.random() * mapSizeY),
    };
  } while (euclideanDistance(playerPosition, enemyPosition) < minDistance);

  return enemyPosition;
};