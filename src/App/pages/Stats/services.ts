import {flatten} from 'lodash';
import {
  GameRedux,
  PlayerStat,
  StatTypes,
} from '../../../redux/redux.definitions';

// #	First Name	Last Name	PL	SP	Serves	  Attacks	    Receptions	Blocks	    Ball Handling	  Digs
//                             SP	SA	A	SE	PTS	ATT	K	E	R	RE	      BS	BA	BE	BHA	AST	BHE	    D	DE

const getStatsByPlayer = (games: GameRedux[]) => {
  const statsArray = flatten(games.map(({stats}) => stats));

  return statsArray.reduce((returnStats, stat) => {
    if (stat.type !== StatTypes.playerStat) {
      return returnStats;
    }

    if (!returnStats[stat.player]) {
      returnStats[stat.player] = {};
    }

    if (!returnStats[stat.player][stat.shorthand]) {
      returnStats[stat.player][stat.shorthand] = 0;
    }

    returnStats[stat.player][stat.shorthand]++;

    return returnStats;
  }, {});
};

export const buildStatsTable = (games: GameRedux[]) => {
  const returnTable = {};
  const playerStats = getStatsByPlayer(games);
  // console.log('playerStats', playerStats);

  // playerStats.map(({player, shorthand}) => {
  //   if (!returnTable[player]) {
  //     returnTable[player] = generateNewStatRow();
  //   }
  //   returnTable[player][shorthand]++;
  // });

  // console.log(JSON.stringify(returnTable, null, 4));
  // return returnTable;
};
