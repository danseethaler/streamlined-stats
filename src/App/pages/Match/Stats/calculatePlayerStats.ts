import {SetType} from '../../../../redux/redux.definitions';
import {getStatDefinitions} from '../../../services/stats/categories';

interface PlayerStat {
  shorthand: string;
  value: number;
}

export default (name, sets: SetType[], useMaxpreps: boolean): PlayerStat[] => {
  const playerStats = [];

  getStatDefinitions().forEach(
    ({shorthand, calculator, maxPrepsCalculator}) => {
      if (useMaxpreps && maxPrepsCalculator === null) {
        return;
      }

      let value;
      if (useMaxpreps && maxPrepsCalculator) {
        value = maxPrepsCalculator(name, sets);
      } else {
        value = calculator(name, sets);
      }

      playerStats.push({shorthand, value});
    }
  );

  return playerStats;
};
