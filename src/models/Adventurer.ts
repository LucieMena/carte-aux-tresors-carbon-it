import { CellTypeEnum } from "../constants/CellType.enum";
import { OrientationsConstants } from "../constants/Orientation.constants";
import { Grid } from "./Grid";
import { Position } from "./Position";

import { isValidPosition } from "../utils/positionUtils";

export class Adventurer {
  name: string;
  position: Position;
  orientation: string;
  treasureCount: number;
  movements: string[];

  constructor(
    name: string,
    position: Position,
    orientation: string,
    treasureCount: number = 0,
    movements: string[]
  ) {
    this.name = name;
    this.position = position;
    this.orientation = orientation;
    this.treasureCount = treasureCount;
    this.movements = movements;
  }

  turnLeft(): void {
    switch (this.orientation) {
      case OrientationsConstants.NORTH:
        this.orientation = OrientationsConstants.WEST;
        break;
      case OrientationsConstants.WEST:
        this.orientation = OrientationsConstants.SOUTH;
        break;
      case OrientationsConstants.SOUTH:
        this.orientation = OrientationsConstants.EAST;
        break;
      case OrientationsConstants.EAST:
        this.orientation = OrientationsConstants.NORTH;
        break;
      default:
        throw new Error(`Invalid orientation: ${this.orientation}`);
    }
  }

  turnRight(): void {
    switch (this.orientation) {
      case OrientationsConstants.NORTH:
        this.orientation = OrientationsConstants.EAST;
        break;
      case OrientationsConstants.WEST:
        this.orientation = OrientationsConstants.NORTH;
        break;
      case OrientationsConstants.SOUTH:
        this.orientation = OrientationsConstants.WEST;
        break;
      case OrientationsConstants.EAST:
        this.orientation = OrientationsConstants.SOUTH;
        break;
      default:
        throw new Error(`Invalid orientation: ${this.orientation}`);
    }
  }

  getNextPosition(): Position {
    const nextPosition = new Position(
      this.position.xPosition,
      this.position.yPosition
    );
    switch (this.orientation) {
      case OrientationsConstants.NORTH:
        nextPosition.yPosition -= 1;
        break;
      case OrientationsConstants.WEST:
        nextPosition.xPosition -= 1;
        break;
      case OrientationsConstants.SOUTH:
        nextPosition.yPosition += 1;
        break;
      case OrientationsConstants.EAST:
        nextPosition.xPosition += 1;
        break;
      default:
        throw new Error(`Invalid orientation: ${this.orientation}`);
    }
    return nextPosition;
  }

  moveForward(): void {
    switch (this.orientation) {
      case OrientationsConstants.NORTH:
        this.position.yPosition -= 1;
        break;
      case OrientationsConstants.WEST:
        this.position.xPosition -= 1;
        break;
      case OrientationsConstants.SOUTH:
        this.position.yPosition += 1;
        break;
      case OrientationsConstants.EAST:
        this.position.xPosition += 1;
        break;
      default:
        throw new Error(`Invalid orientation: ${this.orientation}`);
    }
  }

  canMoveToNextCell(grid: Grid): boolean {
    const nextPosition = this.getNextPosition();

    if (!isValidPosition(nextPosition, grid.width, grid.height)) {
      console.log(
        `Adventurer ${this.name} cannot move to position (${nextPosition.xPosition}, ${nextPosition.yPosition}) because it is out of bounds.`
      );
      return false;
    }
    const nextCell = grid.getCell(nextPosition);
    if (nextCell.cellType === CellTypeEnum.MOUNTAINCELLTYPE) {
      console.log(
        `Adventurer ${this.name} cannot move to position (${nextPosition.xPosition}, ${nextPosition.yPosition}) because it is blocked by a mountain.`
      );
      return false;
    }

    if (nextCell.hasAdventurer) {
      console.log(
        `Adventurer ${this.name} cannot move to position (${nextPosition.xPosition}, ${nextPosition.yPosition}) because it is blocked by another adventurer.`
      );
      return false;
    }

    return true;
  }

  pickUpTreasure(): void {
    this.treasureCount += 1;
  }
}
