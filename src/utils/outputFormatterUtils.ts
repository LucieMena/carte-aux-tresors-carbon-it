import { MapConfigConstants } from "../constants/MapConfig.constants";
import { Adventurer } from "../models/Adventurer";
import { Grid } from "../models/Grid";

const getCLine = (lines: string[]): string | undefined => {
  return lines.find((line: string) => {
    return line.startsWith(MapConfigConstants.MAPSIZE);
  });
};

const getMLines = (lines: string[]): string[] => {
  return lines.filter((line: string) => {
    return line.startsWith(MapConfigConstants.MOUNTAIN);
  });
};

const getTLines = (gameMap: Grid): string[] => {
  return gameMap.cells.flatMap((row, y) =>
    row
      .map((cell, x) => {
        if (cell.treasureCount > 0) {
          return `${MapConfigConstants.TREASURE} - ${x} - ${y}- ${cell.treasureCount}`;
        }
        return null;
      })
      .filter((line) => line !== null)
  );
};

const getALines = (totalAdventurers: Adventurer[]): string[] => {
  return totalAdventurers.map(
    (adventurer) =>
      `${MapConfigConstants.ADVENTURER} - ${adventurer.name} - ${adventurer.position.xPosition} - ${adventurer.position.yPosition} - ${adventurer.orientation} - ${adventurer.treasureCount}`
  );
};

export function formatRecapOutput(
  lines: string[],
  gameMap: Grid,
  totalAdventurers: Adventurer[]
) {
  const CLine: string | undefined = getCLine(lines);

  const MLines: string[] | undefined = getMLines(lines);

  const TLines: string[] | undefined = getTLines(gameMap);

  const ALines: string[] | undefined = getALines(totalAdventurers);

  const printOutput: string[] = [];

  printOutput.push(CLine || "");
  printOutput.push(...(MLines || []));
  printOutput.push(...(TLines || []));
  printOutput.push(...(ALines || []));

  console.log("Final output: \n" + printOutput.join("\n"));
}
