import { Adventurer } from "../models/Adventurer";
import { Grid } from "../models/Grid";

export function silmulateAdventurerMovement(
  adventurers: Adventurer[],
  gameMap: Grid
) {
  adventurers.forEach((adventurer) => {
    adventurer.movements.forEach((movement) => {
      switch (movement) {
        case "A":
          if (adventurer.canMoveToNextCell(gameMap)) {
            const currentCell = gameMap.getCell(adventurer.position);
            currentCell.hasAdventurer = false;

            adventurer.moveForward();

            const newCell = gameMap.getCell(adventurer.position);
            newCell.hasAdventurer = true;

            console.log(
              `Adventurer ${adventurer.name} moved to position (${adventurer.position.xPosition}, ${adventurer.position.yPosition})`
            );

            if (newCell.treasureCount > 0) {
              newCell.treasureCount -= 1;
              adventurer.pickUpTreasure();
              console.log(
                `Adventurer ${adventurer.name} found a treasure! Total treasures: ${adventurer.treasureCount}`
              );
            }
          }
          break;

        case "G":
          adventurer.turnLeft();
          break;

        case "D":
          adventurer.turnRight();
          break;

        default:
          console.error(`Unknown movement: ${movement}`);
      }
    });
  });
}
