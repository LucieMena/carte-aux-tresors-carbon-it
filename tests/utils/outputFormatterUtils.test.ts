import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";
import { formatRecapOutput } from "../../src/utils/outputFormatterUtils";


describe("formatRecapOutput", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should format and print the final output", () => {
    const lines = [
      "C - 3 - 4",
      "M - 1 - 1",
      "M - 0 - 2",
      "A - Lara - 1 - 1 - N - AGD",
    ];

    // Mock Grid with 1 treasure
    const grid = new Grid(3, 4, []);
    const treasureCell = grid.getCell(new Position(2, 3));
    treasureCell.treasureCount = 2;

    // Mock adventurer
    const adventurer = new Adventurer(
      "Lara",
      new Position(1, 1),
      OrientationsConstants.NORTH,
      1,
      []
    );

    formatRecapOutput(lines, grid, [adventurer]);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("C - 3 - 4")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("M - 1 - 1")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("M - 0 - 2")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("T - 2 - 3- 2")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("A - Lara - 1 - 1 - N - 1")
    );
  });

  it("should handle no mountains or treasures gracefully", () => {
    const lines = ["C - 2 - 2"];

    const grid = new Grid(2, 2, []);

    const adventurer = new Adventurer(
      "John",
      new Position(0, 0),
      OrientationsConstants.EAST,
      0,
      []
    );

    formatRecapOutput(lines, grid, [adventurer]);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("C - 2 - 2")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("A - John - 0 - 0 - E - 0")
    );
  });
});
