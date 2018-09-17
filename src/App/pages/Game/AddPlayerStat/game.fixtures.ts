import {GameRedux, StatsAssignment} from '../../../../redux/redux.definitions';

export const newGame: GameRedux = {
  id: 'abc',
  opponent: 'Danger Wolves',
  set: 1,
  serveFirst: false,
  usingRotation: false,
  statsAssignment: StatsAssignment.serving,
  lineup: [],
  stats: [],
};
