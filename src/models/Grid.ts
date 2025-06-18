import { CellTypeEnum } from "../constants/CellType.enum";
import { MapConfigConstants } from "../constants/MapConfig.constants";
import { Cell } from "./Cell";
import { Position } from "./Position";

import { isValidPosition } from "../utils/positionUtils";

export class Grid {
  width: number;
  height: number;
  cells: Cell[][] = []; //tableau [y][x]

  constructor(width: number, height: number, cells: Cell[][]) {
    this.width = width;
    this.height = height;
    this.cells = this.cells = Array.from({ length: height }, (_, y) =>
      Array.from(
        { length: width },
        (_, x) => new Cell(0, false, CellTypeEnum.EMPTYCELLTYPE)
      )
    );
  }

  getCell(position: Position): Cell {
    if (!isValidPosition(position, this.width, this.height)) {
      throw new Error("Position out of bounds");
    }
    return this.cells[position.yPosition][position.xPosition];
  }

  setCellType(position: Position, newCellType: CellTypeEnum): void {
    this.getCell(position).cellType = newCellType;
  }

  addTreasureToCell(position: Position, treasureCount: number): void {
    this.getCell(position).addTreasure(treasureCount);
  }

  printGrid(): void {
    for (let y = 0; y < this.height; y++) {
      let row = "";
      for (let x = 0; x < this.width; x++) {
        const cell = this.cells[y][x];

        if (cell.cellType === CellTypeEnum.MOUNTAINCELLTYPE) {
          row += `${MapConfigConstants.MOUNTAIN}${MapConfigConstants.SPACE}`;
        } else if (cell.treasureCount > 0) {
          row += `${MapConfigConstants.TREASURE}(${cell.treasureCount}) `;
        } else if (cell.hasAdventurer) {
          row += `${MapConfigConstants.ADVENTURER}${MapConfigConstants.SPACE}`;
        } else {
          row += `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}`;
        }
      }
      console.log(row);
    }
  }
}
