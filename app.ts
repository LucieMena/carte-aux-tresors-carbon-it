import * as fs from "fs";

import { Adventurer } from "./src/models/Adventurer";
import { Grid } from "./src/models/Grid";

import {
  getMapSize,
  initializeMap,
  parseInput,
} from "./src/utils/mapInitUtils";
import { silmulateAdventurerMovement } from "./src/utils/adventurerMovementSimulatorUtils";
import { formatRecapOutput } from "./src/utils/outputFormatterUtils";

fs.readFile(
  "inputFile.txt",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading file:", err);
    }

    const lines = data.split("\n");

    const characters = parseInput(lines);

    const [mapWidth, mapHeight] = getMapSize(characters);

    let gameMap: Grid = new Grid(mapWidth, mapHeight, []);

    let totalAdventurers: Adventurer[] = [];

    initializeMap(characters, gameMap, totalAdventurers);

    silmulateAdventurerMovement(totalAdventurers, gameMap);

    formatRecapOutput(lines, gameMap, totalAdventurers);
  }
);
