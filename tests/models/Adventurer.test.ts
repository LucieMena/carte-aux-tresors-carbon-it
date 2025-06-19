import { Adventurer } from "../../src/models/Adventurer";
import { Position } from "../../src/models/Position";
import { OrientationsConstants } from "../../src/constants/Orientation.constants";
import { CellTypeEnum } from "../../src/constants/CellType.enum";
import { SequenceConstants } from "../../src/constants/Sequence.constants";
import { Grid } from "../../src/models/Grid";

describe("Adventurer", () => {
  let adventurer: Adventurer;
  let grid: Grid;

  beforeEach(() => {
    adventurer = new Adventurer(
      "Lucie",
      new Position(2, 3),
      OrientationsConstants.NORTH,
      undefined as any,
      [SequenceConstants.A, SequenceConstants.G]
    );

    grid = new Grid(3, 4, []);
  });

  describe("turnLeft", () => {
    it("should return West when current orientation is North", () => {
      adventurer.turnLeft();

      expect(adventurer.orientation).toBe(OrientationsConstants.WEST);
    });

    it("should return South when current orientation is West", () => {
      adventurer.orientation = OrientationsConstants.WEST;
      adventurer.turnLeft();

      expect(adventurer.orientation).toBe(OrientationsConstants.SOUTH);
    });

    it("should return East when current orientation is South", () => {
      adventurer.orientation = OrientationsConstants.SOUTH;
      adventurer.turnLeft();

      expect(adventurer.orientation).toBe(OrientationsConstants.EAST);
    });

    it("should return North when current orientation is East", () => {
      adventurer.orientation = OrientationsConstants.EAST;
      adventurer.turnLeft();

      expect(adventurer.orientation).toBe(OrientationsConstants.NORTH);
    });

    it("should return error if invalid orientation input", () => {
      adventurer.orientation = "OOPS";

      expect(() => adventurer.turnLeft()).toThrow("Invalid orientation: OOPS");
    });
  });

  describe("turnRight", () => {
    it("should return East when current orientation is North", () => {
      adventurer.turnRight();

      expect(adventurer.orientation).toBe(OrientationsConstants.EAST);
    });

    it("should return North when current orientation is West", () => {
      adventurer.orientation = OrientationsConstants.WEST;
      adventurer.turnRight();

      expect(adventurer.orientation).toBe(OrientationsConstants.NORTH);
    });

    it("should return West when current orientation is South", () => {
      adventurer.orientation = OrientationsConstants.SOUTH;
      adventurer.turnRight();

      expect(adventurer.orientation).toBe(OrientationsConstants.WEST);
    });

    it("should return SOUTH when current orientation is East", () => {
      adventurer.orientation = OrientationsConstants.EAST;
      adventurer.turnRight();

      expect(adventurer.orientation).toBe(OrientationsConstants.SOUTH);
    });

    it("should return error if invalid orientation input", () => {
      adventurer.orientation = "OOPS";

      expect(() => adventurer.turnRight()).toThrow("Invalid orientation: OOPS");
    });
  });

  describe("getNexPosition", () => {
    it("should return yPosition = 2 if current orienation is North", () => {
      const nextPosition: Position = adventurer.getNextPosition();

      expect(nextPosition).toEqual(new Position(2, 2));
    });

    it("should return xPosition = 1 if current orienation is West", () => {
      adventurer.orientation = OrientationsConstants.WEST;
      const nextPosition: Position = adventurer.getNextPosition();

      expect(nextPosition).toEqual(new Position(1, 3));
    });

    it("should return yPosition = 4 if current orienation is South", () => {
      adventurer.orientation = OrientationsConstants.SOUTH;
      const nextPosition: Position = adventurer.getNextPosition();

      expect(nextPosition).toEqual(new Position(2, 4));
    });

    it("should return xPosition = 3 if current orienation is East", () => {
      adventurer.orientation = OrientationsConstants.EAST;
      const nextPosition: Position = adventurer.getNextPosition();

      expect(nextPosition).toEqual(new Position(3, 3));
    });

    it("should return error message if invalid orientation", () => {
      adventurer.orientation = "OOPS";

      expect(() => adventurer.getNextPosition()).toThrow(
        "Invalid orientation: OOPS"
      );
    });
  });

  describe("canMoveToNextCell", () => {
    it("should return false if next cell is outside of grid", () => {
      adventurer.position = new Position(2, 0);

      expect(adventurer.canMoveToNextCell(grid)).toBeFalsy();
    });

    it("should return false if next cell has a mountain in it", () => {
      const nextPosition = adventurer.getNextPosition();
      grid.setCellType(nextPosition, CellTypeEnum.MOUNTAINCELLTYPE);

      expect(adventurer.canMoveToNextCell(grid)).toBeFalsy();
    });

    it("should return false if next cell has another player in it", () => {
      const nextPosition = adventurer.getNextPosition();

      const anotherPlayer: Adventurer = new Adventurer(
        "Toto",
        nextPosition,
        OrientationsConstants.EAST,
        0,
        [SequenceConstants.A,SequenceConstants.G]
      );

      grid.getCell(nextPosition).currentAdventurerPresent = anotherPlayer;

      expect(adventurer.canMoveToNextCell(grid)).toBeFalsy();
    });

    it("should return true if next cell is inside of grid and has no mountains or player in it", () => {
      const nextPosition = adventurer.getNextPosition();
      grid.getCell(nextPosition).currentAdventurerPresent = null;
      grid.setCellType(nextPosition, CellTypeEnum.EMPTYCELLTYPE);

      expect(adventurer.canMoveToNextCell(grid)).toBeTruthy();
    });
  });

  describe("pickUpTreasure", () => {
    it("should increment treasureCount when player walks into cell with treasure", () => {
      const nextPosition = adventurer.getNextPosition();
      grid.addTreasureToCell(nextPosition, 1);
      adventurer.pickUpTreasure();

      expect(adventurer.treasureCount).toEqual(1);
    });
  });
});
