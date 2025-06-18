import { CellTypeEnum } from "../constants/CellType.enum";

export class Cell {
  treasureCount: number;
  hasAdventurer: boolean;
  cellType: CellTypeEnum;

  constructor(treasureCount: number, hasAdventurer: boolean, cellType: CellTypeEnum) {
    this.treasureCount = treasureCount;
    this.hasAdventurer = hasAdventurer;
    this.cellType = cellType;
  }

  addTreasure(treasureCount: number): void {
    if(this.cellType === CellTypeEnum.MOUNTAINCELLTYPE) {
      throw new Error("Can't add treasures to mountain cell")
    }
    this.treasureCount += treasureCount;
  }

  removeTreasure(treasureCount: number): void {
    if (this.treasureCount < treasureCount) {
      throw new Error("There is no treasure to remove");
    }
    this.treasureCount -= treasureCount;
  }
}
