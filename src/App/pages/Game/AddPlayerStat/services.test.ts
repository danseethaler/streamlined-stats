import {StatTypes, GameRedux} from '../../../../redux/redux.definitions';
import {StatCategories} from '../../../services/stats/stats.definitions';
import {getCurrentStatCategoryOptions} from './services';
import {newGame} from './game.fixtures';

const combineNewGame = (partialGame: Partial<GameRedux>) => ({
  ...newGame,
  ...partialGame,
});

describe('getCurrentStatCategoryOptions', () => {
  test('should return serving category on new game when serveFirst', () => {
    const game = combineNewGame({
      stats: [],
      serveFirst: true,
    });
    const currentStatCategories = getCurrentStatCategoryOptions(game);

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Serving);
  });

  test('should return receiving category on new game when not serveFirst', () => {
    const game = combineNewGame({
      stats: [],
      serveFirst: false,
    });

    const currentStatCategories = getCurrentStatCategoryOptions(game);

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Receiving);
  });

  test('should return rally categories when last stat is Dig', () => {
    const game = combineNewGame({
      stats: [
        {
          type: StatTypes.playerStat,
          shorthand: 'D',
          player: 'Jocelyn',
        },
      ],
      serveFirst: false,
    });
    const currentStatCategories = getCurrentStatCategoryOptions(game);

    expect(currentStatCategories).toHaveLength(4);
  });

  test('should return rally categories when last stat is Dig Error', () => {
    const game = combineNewGame({
      stats: [
        {
          type: StatTypes.playerStat,
          shorthand: 'DE',
          player: 'Jocelyn',
        },
      ],
      serveFirst: false,
    });
    const currentStatCategories = getCurrentStatCategoryOptions(game);

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Receiving);
  });
});
