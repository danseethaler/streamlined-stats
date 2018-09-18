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
  const rotation = getRotation(game);

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

export const getRotation = ({lineup, stats, serveFirst}: GameRedux): string[] =>
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

const getPlayerIndexesByPosition = (players, positions) =>
  players.reduce((matchedIndexes, player, index) => {
    if (positions.some(position => player.positions.indexOf(position) >= 0)) {
      matchedIndexes.push(index);
    }
    return matchedIndexes;
  }, []);

export const getMostLikelyStatPlayers = (stat, players: PlayerType[]) => {
  const statDefinition = getStatDefinition(stat);
  switch (statDefinition.category) {
    case StatCategories.Serving:
      return [];

    case StatCategories.Receiving:
      return getPlayerIndexesByPosition(players, ['LB', 'DS']);

    case StatCategories.Attack:
      return getPlayerIndexesByPosition(players, [
        'RS',
        'OH',
        'MB',
        'OPP',
        'MH',
      ]);

    case StatCategories.Blocking:
      return getPlayerIndexesByPosition(players, ['MB', 'RS', 'MH', 'OPP']);

    case StatCategories.BallHandling:
      return getPlayerIndexesByPosition(players, ['S', 'LB']);

    case StatCategories.Digs:
      return getPlayerIndexesByPosition(players, ['LB', 'DS']);
  }
};
