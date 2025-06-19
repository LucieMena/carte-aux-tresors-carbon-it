import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";
import {
  getMapSize,
  initializeMap,
  parseInput,
} from "../../src/utils/mapInitUtils";

describe("mapInitUtils", () => {

  describe("parseInput", () => {
    it("should parse input lines into character arrays without spaces", () => {
      const lines = ["C - 3 - 4", "M - 1 - 1", "T - 2 - 3 - 2"];
      const result = parseInput(lines);

      expect(result).toEqual([
        ["C", "3", "4"],
        ["M", "1", "1"],
        ["T", "2", "3", "2"],
      ]);
    });
  });

  describe("getMapSize", () => {
    it("should extract map width and height from parsed data", () => {
      const characters = [
        ["C", "3", "4"],
        ["M", "1", "1"],
      ];
      const result = getMapSize(characters);

      expect(result).toEqual([3, 4]);
    });

    it("should throw an error if map size is not found", () => {
      const characters = [["M", "1", "1"]];

      expect(() => getMapSize(characters)).toThrow(
        "Map size configuration not found"
      );
    });
  });

  describe("initializeMap", () => {
    let grid: Grid;
    let adventurers: Adventurer[];

    beforeEach(() => {
      grid = new Grid(3, 4, []);
      adventurers = [];
    });

    it("should handle map size character 'C' without error", () => {
      const characters = [["C", "3", "4"]];

      expect(() => initializeMap(characters, grid, adventurers)).not.toThrow();
    });

    it("should add a mountain to the grid", () => {
      const characters = [["M", "1", "1"]];
      initializeMap(characters, grid, adventurers);

      const cell = grid.getCell(new Position(1, 1));

      expect(cell.cellType).toBe(CellTypeEnum.MOUNTAINCELLTYPE);
    });

    it("should add treasure to the grid", () => {
      const characters = [["T", "2", "3", "2"]];
      initializeMap(characters, grid, adventurers);

      const cell = grid.getCell(new Position(2, 3));

      expect(cell.treasureCount).toBe(2);
    });

    it("should add an adventurer to the totalAdventurers array", () => {
      const characters = [["A", "Lucie", "0", "1", "N", "AGD"]];
      initializeMap(characters, grid, adventurers);

      expect(adventurers.length).toBe(1);
      expect(adventurers[0]).toBeInstanceOf(Adventurer);
      expect(adventurers[0].name).toBe("Lucie");
      expect(adventurers[0].orientation).toBe(OrientationsConstants.NORTH);
      expect(adventurers[0].position).toEqual(new Position(0, 1));
      expect(adventurers[0].movements).toEqual(["A", "G", "D"]);
    });

    it("should throw error if encounters unknown characters", () => {
      const characters = [["X", "1", "2"]];

      expect(() => initializeMap(characters, grid, adventurers)).toThrow(
        "Unknown character type: X"
      );
    });
  });
});
