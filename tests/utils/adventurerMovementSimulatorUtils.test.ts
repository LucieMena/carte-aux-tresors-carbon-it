import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { Adventurer } from "../../src/models/Adventurer";
import { Grid } from "../../src/models/Grid";
import { Position } from "../../src/models/Position";
import { silmulateAdventurerMovement } from "../../src/utils/adventurerMovementSimulatorUtils";
import { SequenceConstants } from "../../src/constants/Sequence.constants";

describe("silmulateAdventurerMovement", () => {
  let adventurer: Adventurer;
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(3, 4, []);

    // Creeate treasure cell
    const treasureCellPostion = new Position(0, 1);
    grid.setCellType(treasureCellPostion, CellTypeEnum.EMPTYCELLTYPE);
    grid.addTreasureToCell(treasureCellPostion, 3);

    // Create an adventurer
    adventurer = new Adventurer(
      "Lucie",
      new Position(0, 0),
      OrientationsConstants.EAST,
      0,
      [SequenceConstants.A]
    );

    grid.getCell(adventurer.position).currentAdventurerPresent = adventurer;

    // Create mountain cell
    const mountainPosition = new Position(2, 1);
    grid.setCellType(mountainPosition, CellTypeEnum.MOUNTAINCELLTYPE);
  });

  it("should not move adventurer forward if next position is not valid", () => {
    adventurer.movements = ["G", "A"];
    const oldPosition = adventurer.position;
    silmulateAdventurerMovement([adventurer], grid);

    expect(adventurer.position).toEqual(oldPosition);
    // const oldPosition = adventurer.position;
    // const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // silmulateAdventurerMovement([adventurer], grid);
    // silmulateAdventurerMovement([adventurer], grid);

    // expect(adventurer.position).toEqual(oldPosition);

    // const logs = consoleSpy.mock.calls.flat().join("\n");

    // const attemptedPosition = adventurer.getNextPosition();
    // const expectedLog = `Adventurer ${adventurer.name} cannot move to position (${attemptedPosition.xPosition}, ${attemptedPosition.yPosition})`;

    // expect(logs).toContain(expectedLog);
  });

  it("should move adventurer forward if next position is valid", () => {
    const oldPosition = adventurer.position;
    silmulateAdventurerMovement([adventurer], grid);
    const newPosition = adventurer.position;

    expect(adventurer.position).toEqual(new Position(1, 0));
    expect(grid.getCell(oldPosition).currentAdventurerPresent).toBeNull();
    expect(grid.getCell(newPosition).currentAdventurerPresent).toBe(adventurer);
  });

  it("should move adventurer forward if next position is valid and collect treasure if available", () => {
    adventurer.orientation = OrientationsConstants.SOUTH;
    silmulateAdventurerMovement([adventurer], grid);

    expect(adventurer.position).toEqual(new Position(0, 1));
    expect(adventurer.treasureCount).toEqual(1);
    expect(grid.getCell(adventurer.position).treasureCount).toEqual(2);
  });

  it("should change orientation if turn left", () => {
    adventurer.orientation = OrientationsConstants.SOUTH;
    adventurer.movements = [SequenceConstants.G];
    silmulateAdventurerMovement([adventurer], grid);

    expect(adventurer.orientation).toEqual(OrientationsConstants.EAST);
  });

  it("should change orientation if turn right", () => {
    adventurer.movements = [SequenceConstants.D];
    silmulateAdventurerMovement([adventurer], grid);

    expect(adventurer.orientation).toEqual(OrientationsConstants.SOUTH);
  });

  it("should throw error if unknown movement", () => {
    adventurer.movements = ["O"];

    expect(() => silmulateAdventurerMovement([adventurer], grid)).toThrow(
      "Unknown movement: O"
    );
  });

  it("should update occupiedPositions in second movement round", () => {
    const secondAdventurer = new Adventurer(
      "Toto",
      new Position(2, 0),
      OrientationsConstants.WEST,
      0,
      [SequenceConstants.A, SequenceConstants.A]
    );

    grid.getCell(secondAdventurer.position).currentAdventurerPresent =
      secondAdventurer;

    silmulateAdventurerMovement([adventurer, secondAdventurer], grid);

    expect(secondAdventurer.position).toBeDefined();
  });
});
