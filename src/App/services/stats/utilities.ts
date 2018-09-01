import {flatten} from 'lodash';
import {GameRedux, StatTypes} from '../../../redux/redux.definitions';

export const getFlatStatsFromGames = (games: GameRedux[]) =>
  flatten(games.map(({stats}) => stats));

export const getStatCount = statShorthands => (name, games: GameRedux[]) =>
  getFlatStatsFromGames(games).reduce((statCount, stat) => {
    if (stat.type === StatTypes.playerStat) {
      if (stat.player === name) {
        if (statShorthands.indexOf(stat.shorthand) >= 0) {
          statCount++;
        }
      }
    }

    return statCount;
  }, 0);

export const getPlayerGamesCount = (name: string, games: GameRedux[]): number =>
  games.filter(game => didPlayerPlayInGame(name, game)).length;

export const didPlayerPlayInGame = (name: string, game: GameRedux) => {
  if (game.lineup.indexOf(name) >= 0) {
    return true;
  }

  return game.stats.find(
    stat => stat.type === StatTypes.substitute && stat.subIn === name
  );
};
