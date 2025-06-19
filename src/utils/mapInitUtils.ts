import { CellTypeEnum } from "../constants/CellType.enum";
import { MapConfigConstants } from "../constants/MapConfig.constants";
import { Adventurer } from "../models/Adventurer";
import { Position } from "../models/Position";

export function parseInput(lines: string[]): string[][] {
  const characters = lines.map((line: string) => {
    return line.replace(/\s/g, "").split("-");
  });

  return characters;
}

export function getMapSize(characters: string[][]): [number, number] {
  const mapSizeConfig = characters.find(
    (c) => c[0] === MapConfigConstants.MAPSIZE
  );

  if (!mapSizeConfig) {
    throw new Error("Map size configuration not found");
  }

  return [parseInt(mapSizeConfig[1]), parseInt(mapSizeConfig[2])];
}

export function initializeMap(
  characters: string[][],
  gameMap: any,
  totalAdventurers: any[]
): void {
  characters.forEach((character: string[]) => {
    const firstChar = character[0];

    switch (firstChar) {
      case "C":
        break;

      case "M":
        const mountainPosition = new Position(
          parseInt(character[1]),
          parseInt(character[2])
        );

        gameMap.setCellType(mountainPosition, CellTypeEnum.MOUNTAINCELLTYPE);
        break;

      case "T":
        const treasurePosition = new Position(
          parseInt(character[1]),
          parseInt(character[2])
        );

        gameMap.addTreasureToCell(treasurePosition, parseInt(character[3]));
        break;

      case "A":
        const adventurer = new Adventurer(
          character[1],
          new Position(parseInt(character[2]), parseInt(character[3])),
          character[4],
          0,
          character[5].split("")
        );
        totalAdventurers.push(adventurer);

        gameMap.getCell(adventurer.position).currentAdventurerPresent =
          adventurer;
        break;

      default:
        throw Error(`Unknown character type: ${firstChar}`);
    }
  });
}
