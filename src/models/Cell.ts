import { CellTypeEnum } from "../constants/CellType.enum";
import { Adventurer } from "./Adventurer";

export class Cell {
  treasureCount: number;
  cellType: CellTypeEnum;
  currentAdventurerPresent : Adventurer | null;

  constructor(treasureCount: number, cellType: CellTypeEnum, adventurer: Adventurer | null) {
    this.treasureCount = treasureCount;
    this.cellType = cellType;
    this.currentAdventurerPresent = adventurer;
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
