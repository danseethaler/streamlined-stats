import {map} from 'lodash';
import React from 'react';
import {GameRedux} from '../../../redux/redux.definitions';
import players, {PlayerType} from '../../services/players';
import {getStatCategoryDefinitions} from '../../services/stats/categories';
import calculatePlayerStats from './calculatePlayerStats';

interface PlayerStat {
  shorthand: string;
  value: number;
}

interface CalculatedPlayerStats extends PlayerType {
  stats: PlayerStat[];
}

const getStatsByPlayer = (
  games: GameRedux[],
  useMaxpreps
): CalculatedPlayerStats[] =>
  players.map(player => ({
    ...player,
    stats: calculatePlayerStats(player.name, games, useMaxpreps),
  }));

const statDefinitions = getStatCategoryDefinitions();

const HeaderRowCategoryName = ({useMaxpreps}) => (
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      {statDefinitions.map(category => (
        <th
          key={category.name}
          colSpan={
            category.stats.filter(
              ({maxPrepsCalculator}) =>
                !useMaxpreps || maxPrepsCalculator !== null
            ).length
          }
        >
          {category.name}
        </th>
      ))}
    </tr>
  </thead>
);

const HeaderRowCategoryStat = ({useMaxpreps}) => (
  <thead>
    <tr>
      <th />
      <th />
      {statDefinitions.map(({stats}) =>
        stats
          .filter(
            ({maxPrepsCalculator}) =>
              !useMaxpreps || maxPrepsCalculator !== null
          )
          .map(stat => <th key={stat.shorthand}>{stat.shorthand}</th>)
      )}
    </tr>
  </thead>
);

const playerRows = playerStats =>
  map(playerStats, playerStatData => (
    <tr key={playerStatData.jersey.toString()}>
      <td>{playerStatData.jersey.toString()}</td>
      <td>{playerStatData.name}</td>
      {playerStatData.stats.map(({shorthand, value}) => (
        <td key={shorthand}>{value}</td>
      ))}
    </tr>
  ));

const totalsRow = playerStats => {
  const totalsRowData = playerStats.reduce((totalsData, player) => {
    player.stats.forEach(({value}, index) => {
      if (!totalsData[index]) {
        totalsData[index] = 0;
      }
      totalsData[index] += value;
    });
    return totalsData;
  }, []);

  return (
    <tr>
      <td colSpan={2}>Totals</td>
      {totalsRowData.map((value, index) => (
        <th key={index}>{value}</th>
      ))}
    </tr>
  );
};

export const buildStatsTable = (games: GameRedux[], useMaxpreps: boolean) => {
  const playerStats = getStatsByPlayer(games, useMaxpreps);

  return (
    <table className="pure-table pure-table-striped">
      <HeaderRowCategoryName useMaxpreps={useMaxpreps} />
      <HeaderRowCategoryStat useMaxpreps={useMaxpreps} />
      <tbody>
        {playerRows(playerStats)}
        {totalsRow(playerStats)}
      </tbody>
    </table>
  );
};
