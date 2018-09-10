import {produce} from 'immer';
import {cloneDeep} from 'lodash';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
  GameRedux,
} from '../../../../../redux/redux.definitions';
import {whoScoredFromStat} from '../../../../../redux/services';
import {PlayerType} from '../../../../services/players';
import {getStatDefinition} from '../../../../services/stats/categories';
import {StatCategories} from '../../../../services/stats/stats.definitions';

const rotatePlayers = rotation => {
  const [lastServer] = rotation.splice(0, 1);
  rotation.push(lastServer);
};

export const getFormattedRotation = (
  game: GameRedux,
  swapped: boolean
): string[] => {
  const rotation = getRotation(game.lineup, game.stats, game.serveFirst);

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

export const getMostLikelyStatPlayers = (stat, players: PlayerType[]) => {
  const statDefinition = getStatDefinition(stat);
  switch (statDefinition.category) {
    case StatCategories.Serving:
      return [1];

    case StatCategories.Receiving:
      return [1, 3, 5]; // Backrow

    case StatCategories.Attack:
      return players.reduce((matchedIndexes, player, index) => {
        if (['RS', 'OH', 'MB', 'OPP', 'MH'].indexOf(player.positions[0]) >= 0) {
          matchedIndexes.push(index);
        }
        return matchedIndexes;
      }, []);

    case StatCategories.Blocking:
      return [0, 2, 4]; // Frontrow

    case StatCategories.BallHandling:
      return players.reduce((matchedIndexes, player, index) => {
        if (['S', 'LB'].indexOf(player.positions[0]) >= 0) {
          matchedIndexes.push(index);
        }
        return matchedIndexes;
      }, []);

    case StatCategories.Digs:
      return [1, 3, 5]; // Backrow
  }
};
