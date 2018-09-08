import {produce} from 'immer';
import {cloneDeep} from 'lodash';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../../redux/redux.definitions';
import {whoScoredFromStat} from '../../../../../redux/services';

const rotatePlayers = rotation => {
  const [lastServer] = rotation.splice(0, 1);
  rotation.push(lastServer);
};

export const getFormattedRotation = (
  rotation: string[],
  swapped: boolean
): string[] => {
  if (swapped) {
    return [
      rotation[4],
      rotation[3],
      rotation[5],
      rotation[2],
      rotation[0],
      rotation[1],
    ];
  }

  return [
    rotation[1],
    rotation[0],
    rotation[2],
    rotation[5],
    rotation[3],
    rotation[4],
  ];
};

export const getRotation = (
  lineup: string[],
  stats: StatType[],
  serveFirst: boolean
): string[] =>
  produce(lineup, rotation => {
    let serving = serveFirst;

    cloneDeep(stats)
      .reverse()
      .forEach(stat => {
        if (stat.type === StatTypes.substitute) {
          // Swap out rotation players on substitute
          const currentPlayerIndex = rotation.findIndex(
            name => name === stat.subOut
          );
          rotation.splice(currentPlayerIndex, 1, stat.subIn);
        }

        const scoringTeam = whoScoredFromStat(stat);
        if (scoringTeam === UsOrOpponent.us) {
          if (!serving) {
            serving = true;
            rotatePlayers(rotation);
          }
        } else if (scoringTeam === UsOrOpponent.opponent) {
          if (serving) {
            serving = false;
          }
        }

        return rotation;
      });
  });
