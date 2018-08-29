import produce from 'immer';
import {ADD_GAME, ADD_STAT} from '../constants';
import {GamesRedux} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        newState[action.game.id].rotation = action.game.lineup;
        break;

      case ADD_STAT:
        if (!newState[action.game].stats) {
          newState[action.game].stats = [];
        }
        newState[action.game].stats.push(action.stat);
        break;
    }
  });
