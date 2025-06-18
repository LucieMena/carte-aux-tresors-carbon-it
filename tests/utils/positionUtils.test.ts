import { Position } from "../../src/models/Position";
import { isValidPosition } from "../../src/utils/positionUtils";

describe("positionUtils", () => {
  const mapHeight = 4;
  const mapWidth = 4;

  it("should return true if position in within map bounds", () => {
    const position = new Position(3, 2);

    expect(isValidPosition(position, mapWidth, mapHeight)).toBeTruthy;
  });

  it("should return false if xPosition negative", () => {
    const position = new Position(-3, 2);

    expect(isValidPosition(position, mapWidth, mapHeight)).toBeFalsy;
  });

  it("should return false if yPosition negative", () => {
    const position = new Position(3, -2);

    expect(isValidPosition(position, mapWidth, mapHeight)).toBeFalsy;
  });

  it("should return false if xPosition is bigger than mapWidth", () => {
    const position = new Position(10, 2);

    expect(isValidPosition(position, mapWidth, mapHeight)).toBeFalsy;
  });

   it("should return false if yPosition is bigger than mapHeight", () => {
     const position = new Position(3, 20);

     expect(isValidPosition(position, mapWidth, mapHeight)).toBeFalsy;
   });
});
