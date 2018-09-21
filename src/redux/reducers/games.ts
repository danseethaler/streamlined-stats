import produce from 'immer';
import {
  ADD_GAME,
  ADD_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
  TOGGLE_ADJUSTMENT_LAST_STAT,
} from '../constants';
import {GamesRedux, StatTypes} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        break;

      case ADD_STAT:
        const statGame = newState[action.game];
        const lastStat = statGame.stats[0];

        if (lastStat) {
          // Change BHA to AST on kill
          if (lastStat.shorthand === 'BHA' && action.stat.shorthand === 'K') {
            statGame.stats[0].shorthand = 'AST';
          }

          // Change BS to BA on double block
          const lastStatIsBlock = ['BS', 'BA'].indexOf(lastStat.shorthand) >= 0;
          if (lastStatIsBlock && action.stat.shorthand === 'BS') {
            statGame.stats[0].shorthand = 'BA';
            action.stat.shorthand = 'BA';
          }
        }

        statGame.stats.unshift(action.stat);
        break;

      case UNDO_LAST_STAT:
        const undoGame = newState[action.game];
        undoGame.stats.shift();

        break;

      case TOGGLE_ADJUSTMENT_LAST_STAT:
        const priorGame = newState[action.game];
        const priorStat = priorGame.stats.shift();

        if (!priorStat) {
          break;
        }

        if (priorStat.type === StatTypes.playerStat) {
          priorStat.adjustment = !priorStat.adjustment;
        }
        priorGame.stats.unshift(priorStat);

        break;

      case UPDATE_STATS_ORDER:
        newState[action.game].stats = action.stats;

        break;
    }
  });
