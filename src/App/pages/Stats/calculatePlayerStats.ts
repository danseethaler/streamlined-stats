import {flatten} from 'lodash';
import {GameRedux, StatTypes} from '../../../redux/redux.definitions';
import {
  getStatDefinition,
  StatResultTypes,
} from '../../services/stats_definitions';

const playerPlayedInGame = (name: string, game: GameRedux) => {
  if (game.lineup.indexOf(name) >= 0) {
    return true;
  }

  return game.stats.find(
    stat => stat.type === StatTypes.substitute && stat.subIn === name
  );
};

const getFlatStatsFromGames = (games: GameRedux[]) =>
  flatten(games.map(({stats}) => stats));

const getStatCount = (statShorthands, name, games: GameRedux[]) =>
  getFlatStatsFromGames(games).reduce((serviceAttemtps, stat) => {
    if (stat.type === StatTypes.playerStat) {
      if (stat.player === name) {
        if (statShorthands.indexOf(stat.shorthand) >= 0) {
          serviceAttemtps++;
        }
      }
    }

    return serviceAttemtps;
  }, 0);

const statCalcFunctions = [
  {
    shorthand: 'SP',
    calculator: (name, games) =>
      games.filter(playerPlayedInGame.bind(null, name)).length,
  },
  {
    shorthand: 'SA',
    calculator: getStatCount.bind(null, ['SA', 'A', 'SE']),
  },
  {
    shorthand: 'A',
    calculator: getStatCount.bind(null, ['A']),
  },
  {
    shorthand: 'SE',
    calculator: getStatCount.bind(null, ['SE']),
  },
  {
    shorthand: 'PTS',
    calculator: (name, games) => {
      const statsArray = getFlatStatsFromGames(games);

      let isServing = false;

      return statsArray.reduce((points, stat) => {
        if (stat.type === StatTypes.playerStat && stat.player === name) {
          if (stat.shorthand === 'A') {
            points++;
          }
          if (stat.shorthand === 'SA') {
            isServing = true;
          }
          if (isServing) {
            const statDefintion = getStatDefinition(stat.shorthand);

            if (statDefintion.result === StatResultTypes.point) {
              points++;
            }

            if (statDefintion.result === StatResultTypes.error) {
              isServing = false;
            }
          }
        }

        return points;
      }, 0);
    },
  },
  {
    shorthand: 'R1',
    calculator: getStatCount.bind(null, ['R1']),
  },
  {
    shorthand: 'R2',
    calculator: getStatCount.bind(null, ['R2']),
  },
  {
    shorthand: 'R3',
    calculator: getStatCount.bind(null, ['R3']),
  },
  {
    shorthand: 'RE',
    calculator: getStatCount.bind(null, ['RE']),
  },
  {
    shorthand: 'BS',
    calculator: getStatCount.bind(null, ['BS']),
  },
  {
    shorthand: 'BA',
    calculator: getStatCount.bind(null, ['BA']),
  },
  {
    shorthand: 'BE',
    calculator: getStatCount.bind(null, ['BE']),
  },
  {
    shorthand: 'D',
    calculator: getStatCount.bind(null, ['D']),
  },
  {
    shorthand: 'DE',
    calculator: getStatCount.bind(null, ['DE']),
  },
  {
    shorthand: 'BHA',
    calculator: getStatCount.bind(null, ['BHA']),
  },
  {
    shorthand: 'AST',
    calculator: getStatCount.bind(null, ['AST']),
  },
  {
    shorthand: 'BHE',
    calculator: getStatCount.bind(null, ['BHE']),
  },
  {
    shorthand: 'ATT',
    calculator: getStatCount.bind(null, ['ATT']),
  },
  {
    shorthand: 'K',
    calculator: getStatCount.bind(null, ['K']),
  },
  {
    shorthand: 'E',
    calculator: getStatCount.bind(null, ['E']),
  },
  {
    shorthand: 'FB',
    calculator: getStatCount.bind(null, ['FB']),
  },
];

interface PlayerStat {
  shorthand: string;
  value: number;
}

export default (name, games: GameRedux[]): PlayerStat[] => {
  const playerStats = [];

  statCalcFunctions.map(({shorthand, calculator}) => {
    const value = calculator(name, games);
    playerStats.push({shorthand, value});
  });

  return playerStats;
};
