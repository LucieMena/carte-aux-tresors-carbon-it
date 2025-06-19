import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { MapConfigConstants } from "../../src/constants/MapConfig.constants";
import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { SequenceConstants } from "../../src/constants/Sequence.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";

describe("Grid", () => {
  let grid: Grid;
  let validCellPosition: Position;

  beforeEach(() => {
    grid = new Grid(3, 4, []);
  });

  validCellPosition = new Position(1, 1);

  describe("getCell", () => {
    it("should throw error if is not valid position", () => {
      const invalidPosition: Position = new Position(5, 5);

      expect(() => grid.getCell(invalidPosition)).toThrow(
        "Position out of bounds"
      );
    });

    it("should return cell based on position", () => {
      const cell = grid.getCell(validCellPosition);

      expect(cell).toBeDefined();
      expect(cell.cellType).toBe(CellTypeEnum.EMPTYCELLTYPE);
    });
  });

  describe("setCellType", () => {
    it("should set cell type based on position", () => {
      grid.setCellType(validCellPosition, CellTypeEnum.MOUNTAINCELLTYPE);
      expect(grid.getCell(validCellPosition).cellType).toBe(
        CellTypeEnum.MOUNTAINCELLTYPE
      );
    });
  });

  describe("addTreasureToCell", () => {
    it("should add N treasure amount to cell", () => {
      const cell = grid.getCell(validCellPosition);
      const treasureAmount: number = 3;
      grid.addTreasureToCell(validCellPosition, treasureAmount);

      expect(cell.treasureCount).toEqual(3);
    });
  });

  describe("printGrid", () => {
    it("should print grid based on cells structure", () => {
      grid.setCellType(new Position(2, 2), CellTypeEnum.MOUNTAINCELLTYPE);

      grid.addTreasureToCell(new Position(2, 3), 2);

      const adventurer: Adventurer = new Adventurer(
        "Lara",
        new Position(0, 3),
        OrientationsConstants.EAST,
        0,
        [SequenceConstants.A]
      );

      grid.getCell(new Position(0, 3)).currentAdventurerPresent = adventurer;

      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      grid.printGrid();

      const expectedRow0 =
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}`;

      const expectedRow1 =
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}`;

      const expectedRow2 =
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.MOUNTAIN}${MapConfigConstants.SPACE}`;

      const expectedRow3 =
        `${MapConfigConstants.ADVENTURER}(Lara)${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.EMPTYCELL}${MapConfigConstants.SPACE}` +
        `${MapConfigConstants.TREASURE}(2)${MapConfigConstants.SPACE}`;

      expect(consoleSpy).toHaveBeenNthCalledWith(1, expectedRow0);
      expect(consoleSpy).toHaveBeenNthCalledWith(2, expectedRow1);
      expect(consoleSpy).toHaveBeenNthCalledWith(3, expectedRow2);
      expect(consoleSpy).toHaveBeenNthCalledWith(4, expectedRow3);

      consoleSpy.mockRestore();
    });
  });
});
