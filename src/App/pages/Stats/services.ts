import {flatten, groupBy} from 'lodash';
import {
  GameRedux,
  PlayerStat,
  StatTypes,
} from '../../../redux/redux.definitions';

// #	First Name	Last Name	PL	SP	Serves	  Attacks	    Receptions	Blocks	    Ball Handling	  Digs
//                             SP	SA	A	SE	PTS	ATT	K	E	R	RE	      BS	BA	BE	BHA	AST	BHE	    D	DE

const getStatsByPlayer = (games: GameRedux[]) => {
  const statsArray = flatten(games.map(({stats}) => stats));

  const playerStats = statsArray.filter(
    ({type}) => type === StatTypes.playerStat
  ) as PlayerStat[];

  const statsByPlayer = groupBy(playerStats, 'player');

  return statsByPlayer;
};

export const buildStatsTable = (games: GameRedux[]) => {
  const returnTable = {};
  const playerStats = getStatsByPlayer(games);

  // playerStats.map(({player, shorthand}) => {
  //   if (!returnTable[player]) {
  //     returnTable[player] = generateNewStatRow();
  //   }
  //   returnTable[player][shorthand]++;
  // });

  // console.log(JSON.stringify(returnTable, null, 4));
  // return returnTable;
};
