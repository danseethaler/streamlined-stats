import {map} from 'lodash';
import React from 'react';
import {GameRedux} from '../../../redux/redux.definitions';
import players, {PlayerType} from '../../services/players';
import {getStatCategoryDefinitions} from '../../services/stats/categories';
import calculatePlayerStats from './calculatePlayerStats';
import {ThSticky} from './components';

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
  <tr>
    <ThSticky>#</ThSticky>
    <ThSticky>Name</ThSticky>
    {statDefinitions.map(category => (
      <ThSticky
        key={category.name}
        colSpan={
          category.stats.filter(
            ({maxPrepsCalculator}) =>
              !useMaxpreps || maxPrepsCalculator !== null
          ).length
        }
      >
        {category.name}
      </ThSticky>
    ))}
  </tr>
);

const HeaderRowCategoryStat = ({useMaxpreps}) => (
  <tr>
    <ThSticky offset={39} />
    <ThSticky offset={39} />
    {statDefinitions.map(({stats}) =>
      stats
        .filter(
          ({maxPrepsCalculator}) => !useMaxpreps || maxPrepsCalculator !== null
        )
        .map(stat => (
          <ThSticky offset={39} key={stat.shorthand}>
            {stat.shorthand}
          </ThSticky>
        ))
    )}
  </tr>
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
    <table
      className="pure-table pure-table-striped"
      style={{
        marginBottom: 'calc(100vh - 7.3em)',
      }}
    >
      <thead>
        <HeaderRowCategoryName useMaxpreps={useMaxpreps} />
        <HeaderRowCategoryStat useMaxpreps={useMaxpreps} />
      </thead>
      <tbody>
        {playerRows(playerStats)}
        {totalsRow(playerStats)}
      </tbody>
    </table>
  );
};
