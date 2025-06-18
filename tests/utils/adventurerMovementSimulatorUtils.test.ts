import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";
import { silmulateAdventurerMovement } from "../../src/utils/adventurerMovementSimulatorUtils";


describe("silmulateAdventurerMovement", () => {
  let adventurer: Adventurer;
  let grid: Grid;

  beforeEach(() => {
    // Create a 3x3 grid
    grid = new Grid(3, 3, []);

    // Place a treasure at (1, 0)
    const treasureCell = grid.getCell(new Position(1, 0));
    treasureCell.cellType = CellTypeEnum.EMPTYCELLTYPE;
    treasureCell.treasureCount = 1;

    // Create an adventurer at (0, 0), facing EAST, with one "A" move
    adventurer = new Adventurer(
      "Lara",
      new Position(0, 0),
      OrientationsConstants.EAST,
      0,
      ["A"]
    );

    // Mark the starting cell as occupied
    grid.getCell(adventurer.position).hasAdventurer = true;
  });

  it("should move adventurer forward to a valid cell and collects treasure", () => {
    silmulateAdventurerMovement([adventurer], grid);

    // Adventurer should move from (0,0) to (1,0)
    expect(adventurer.position.xPosition).toBe(1);
    expect(adventurer.position.yPosition).toBe(0);

    // New cell should have adventurer
    expect(grid.getCell(new Position(1, 0)).hasAdventurer).toBe(true);
    // Old cell should be free
    expect(grid.getCell(new Position(0, 0)).hasAdventurer).toBe(false);

    // Treasure should have been collected
    expect(adventurer.treasureCount).toBe(1);
    expect(grid.getCell(new Position(1, 0)).treasureCount).toBe(0);
  });

  it("should turn left and right correctly", () => {
    adventurer.movements = ["G", "D"]; // Left then Right

    silmulateAdventurerMovement([adventurer], grid);

    // Starts EAST -> turnLeft() = NORTH -> turnRight() = EAST again
    expect(adventurer.orientation).toBe(OrientationsConstants.EAST);
  });

  it("should ignore invalid movement command", () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    adventurer.movements = ["Z"];
    silmulateAdventurerMovement([adventurer], grid);

    expect(consoleErrorMock).toHaveBeenCalledWith("Unknown movement: Z");

    consoleErrorMock.mockRestore();
  });

  it("should not move into mountain", () => {
    const mountainPosition = new Position(1, 0);
    const mountainCell = grid.getCell(mountainPosition);
    mountainCell.cellType = CellTypeEnum.MOUNTAINCELLTYPE;

    silmulateAdventurerMovement([adventurer], grid);

    // Adventurer should not have moved
    expect(adventurer.position.xPosition).toBe(0);
    expect(adventurer.position.yPosition).toBe(0);

    // Still at the original cell
    expect(grid.getCell(new Position(0, 0)).hasAdventurer).toBe(true);
    expect(grid.getCell(mountainPosition).hasAdventurer).toBe(false);
  });
});
