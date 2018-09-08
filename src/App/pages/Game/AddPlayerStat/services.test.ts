import {StatTypes} from '../../../../redux/redux.definitions';
import {StatCategories} from '../../../services/stats/definitions';
import {getCurrentStatCategoryOptions} from './services';

describe('getCurrentStatCategoryOptions', () => {
  test('should return serving category on new game when serveFirst', () => {
    const currentStatCategories = getCurrentStatCategoryOptions([], true);

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Serving);
  });

  test('should return receiving category on new game when not serveFirst', () => {
    const currentStatCategories = getCurrentStatCategoryOptions([], false);

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Receiving);
  });

  test('should return rally categories when last stat is Dig', () => {
    const currentStatCategories = getCurrentStatCategoryOptions(
      [
        {
          type: StatTypes.playerStat,
          shorthand: 'D',
          player: 'Jocelyn',
        },
      ],
      false
    );

    expect(currentStatCategories).toHaveLength(4);
  });

  test('should return rally categories when last stat is Dig Error', () => {
    const currentStatCategories = getCurrentStatCategoryOptions(
      [
        {
          type: StatTypes.playerStat,
          shorthand: 'DE',
          player: 'Jocelyn',
        },
      ],
      false
    );

    expect(currentStatCategories).toHaveLength(1);
    expect(currentStatCategories[0].name).toEqual(StatCategories.Receiving);
  });
});
