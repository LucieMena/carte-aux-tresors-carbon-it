import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { Cell } from "../../src/models/Cell";

describe("Cell", () => {
  let cell: Cell;
  let treasureAmount: number;

  beforeEach(() => {
    cell = new Cell(1, CellTypeEnum.EMPTYCELLTYPE, null);
    treasureAmount = 2;
  });

  describe("addTreasure", () => {
    it("should add N number of treasure in cell", () => {
      cell.addTreasure(treasureAmount);
      expect(cell.treasureCount).toEqual(3);
    });

    it("should throw error because the cell is a mountain", () => {
      cell.cellType = CellTypeEnum.MOUNTAINCELLTYPE;

      expect(() => cell.addTreasure(treasureAmount)).toThrow(
        "Can't add treasures to mountain cell"
      );
    });
  });

  describe("removeTreasure", () => {
    it("should remove N amount of treasure in cell", () => {
      treasureAmount = 1;
      cell.removeTreasure(treasureAmount);
      expect(cell.treasureCount).toEqual(0);
    });

    it("should throw error because the cell can't have negative number of treasures", () => {
      expect(() => cell.removeTreasure(treasureAmount)).toThrow(
        "There is no treasure to remove"
      );
    });
  });
});
