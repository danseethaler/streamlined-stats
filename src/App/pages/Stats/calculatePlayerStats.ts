import {GameRedux} from '../../../redux/redux.definitions';
import {getStatDefinitions} from '../../services/stats/categories';

interface PlayerStat {
  shorthand: string;
  value: number;
}

export default (
  name,
  games: GameRedux[],
  useMaxpreps: boolean
): PlayerStat[] => {
  const playerStats = [];

  getStatDefinitions().forEach(
    ({shorthand, calculator, maxPrepsCalculator}) => {
      if (useMaxpreps && maxPrepsCalculator === null) {
        return;
      }

      let value;
      if (useMaxpreps && maxPrepsCalculator) {
        value = maxPrepsCalculator(name, games);
      } else {
        value = calculator(name, games);
      }

      playerStats.push({shorthand, value});
    }
  );

  return playerStats;
};
