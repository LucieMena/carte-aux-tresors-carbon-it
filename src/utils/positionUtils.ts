import { Position } from "../models/Position";

export const isValidPosition = (
  position: Position,
  mapWidth: number,
  mapHeight: number
): boolean => {
  return (
    position.xPosition >= 0 &&
    position.yPosition >= 0 &&
    position.xPosition < mapWidth &&
    position.yPosition < mapHeight
  );
};
