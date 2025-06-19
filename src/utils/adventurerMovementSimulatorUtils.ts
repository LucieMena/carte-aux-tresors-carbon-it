import { Adventurer } from "../models/Adventurer";
import { Grid } from "../models/Grid";

export function silmulateAdventurerMovement(
  adventurers: Adventurer[],
  gameMap: Grid
) {
  const maxMoves = Math.max(...adventurers.map((a) => a.movements.length));

  for (let i = 0; i < maxMoves; i++) {
    // Create a snapshot of occupied positions at the start of this round
    const occupiedPositions = new Set(
      adventurers.map((a) => `${a.position.xPosition},${a.position.yPosition}`)
    );

    for (const adventurer of adventurers) {
      const movement = adventurer.movements[i];
      if (!movement) continue;

      switch (movement) {
        case "A": {
          const nextPosition = adventurer.getNextPosition();
          const key = `${nextPosition.xPosition},${nextPosition.yPosition}`;

          // Check bounds, mountains, and other adventurers using the snapshot
          if (!adventurer.canMoveToNextCell(gameMap, occupiedPositions)) {
            continue;
          }

          const currentCell = gameMap.getCell(adventurer.position);
          const nextCell = gameMap.getCell(nextPosition);

          // Move adventurer
          currentCell.currentAdventurerPresent = null;
          adventurer.position = nextPosition;
          nextCell.currentAdventurerPresent = adventurer;

          console.log(
            `Adventurer ${adventurer.name} moved to position (${adventurer.position.xPosition}, ${adventurer.position.yPosition})`
          );

          // Handle treasure
          if (nextCell.treasureCount > 0) {
            nextCell.treasureCount -= 1;
            adventurer.pickUpTreasure();
            console.log(
              `Adventurer ${adventurer.name} found a treasure! Total treasures: ${adventurer.treasureCount}`
            );
          }
          break;
        }

        case "G":
          adventurer.turnLeft();
           console.log(
             `Adventurer ${adventurer.name} turned left`
           );
          break;

        case "D":
          adventurer.turnRight();
          console.log(`Adventurer ${adventurer.name} turned right`);
          break;

        default:
          throw new Error(`Unknown movement: ${movement}`);
      }
    }
  }
}
