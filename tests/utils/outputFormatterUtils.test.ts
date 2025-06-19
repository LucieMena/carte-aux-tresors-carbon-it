import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";
import { silmulateAdventurerMovement } from "../../src/utils/adventurerMovementSimulatorUtils";
import { initializeMap, parseInput } from "../../src/utils/mapInitUtils";
import {
  formatRecapOutput,
  getALines,
  getCLine,
  getMLines,
  getTLines,
} from "../../src/utils/outputFormatterUtils";

describe("outputFormatterUtils", () => {
  let lines: string[];
  let grid: Grid;
  let adventurer: Adventurer;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();

    lines = [
      "C - 3 - 4",
      "M - 1 - 1",
      "M - 2 - 2",
      "T - 0 - 3 - 2",
      "T - 1 - 3 - 1",
      "A - Lucie - 1 - 2 - E - ADADA",
    ];

    adventurer = new Adventurer(
      "Lucie",
      new Position(1, 2),
      OrientationsConstants.EAST,
      0,
      ["A", "D", "A", "D", "A"]
    );

    grid = new Grid(3, 4, []);

    const characters = parseInput(lines);
    initializeMap(characters, grid, [adventurer]);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("getClines", () => {
    it("should return only line that starts with 'C'", () => {
      const result = getCLine(lines);

      expect(result).toEqual("C - 3 - 4");
    });
  });

  describe("getMlines", () => {
    it("should return all lines that start with 'M'", () => {
      const result = getMLines(lines);

      expect(result).toEqual(["M - 1 - 1", "M - 2 - 2"]);
    });
  });

  describe("getTLines", () => {
    it("should return all treasure lines based on the grid state", () => {
      silmulateAdventurerMovement([adventurer], grid);
      const result = getTLines(grid);

      expect(result).toEqual(["T - 0 - 3 - 1"]);
    });
  });

  describe("getALines", () => {
    it("should return all adventurer lines based on the totalAdventurers array", () => {
      silmulateAdventurerMovement([adventurer], grid);
      const result = getALines([adventurer]);

      expect(result).toEqual(["A - Lucie - 0 - 3 - W - 2"]);
    });
  });

  describe("formatRecapOutput", () => {
    it("should format and print the final output", () => {
      const expectedOutput = [
        "C - 3 - 4",
        "M - 1 - 1",
        "M - 2 - 2",
        "T - 0 - 3 - 1",
        "A - Lucie - 0 - 3 - W - 2",
      ].join("\n");

      silmulateAdventurerMovement([adventurer], grid);
      formatRecapOutput(lines, grid, [adventurer]);
      const lastConsoleCall =
        consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];

      expect(lastConsoleCall).toBe("Final output: \n" + expectedOutput);
    });

    it("should handle empty lines", () => {
      const mockGetMLines = jest
        .spyOn(require("../../src/utils/outputFormatterUtils"), "getMLines")
        .mockReturnValue(undefined as any);

      const mockGetTLines = jest
        .spyOn(require("../../src/utils/outputFormatterUtils"), "getTLines")
        .mockReturnValue(undefined as any);

      const mockGetALines = jest
        .spyOn(require("../../src/utils/outputFormatterUtils"), "getALines")
        .mockReturnValue(undefined as any);

      const minimalLines: string[] = [];
      const emptyGrid = new Grid(3, 3, []);
      const noAdventurers: Adventurer[] = [];

      const expectedOutput = [
        "", // getCLine fallback
        // no M lines
        // no T lines
        // no A lines
      ].join("\n");

      formatRecapOutput(minimalLines, emptyGrid, noAdventurers);

      const lastConsoleCall =
        consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];

      expect(lastConsoleCall).toBe("Final output: \n" + expectedOutput);

      mockGetMLines.mockRestore();
      mockGetTLines.mockRestore();
      mockGetALines.mockRestore();
    });
  });
});
