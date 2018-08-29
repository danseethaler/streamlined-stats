import produce from 'immer';
import {ADD_GAME, ADD_STAT} from '../constants';

const initialState = {};

const addGameDefaults = game => ({...{stats: []}, ...game});

export default (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = addGameDefaults(action.game);
        break;

      case ADD_STAT:
        if (!newState[action.game].stats) {
          newState[action.game].stats = [];
        }
        newState[action.game].stats.push(action.stat);
        break;
    }
  });
