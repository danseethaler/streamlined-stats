import produce from 'immer';
import {remove} from 'lodash';
import {ADD_GAME, ADD_STAT} from '../constants';
import {GamesRedux, StatTypes} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        newState[action.game.id].rotation = action.game.lineup;
        break;

      case ADD_STAT:
        const statGame = newState[action.game];
        if (!statGame.stats) {
          statGame.stats = [];
        }

        // Swap out rotation players on substitute
        if (action.stat.type === StatTypes.substitute) {
          remove(statGame.rotation, player => player === action.stat.subOut);
          statGame.rotation.push(action.stat.subIn);
        }

        statGame.stats.push(action.stat);
        break;
    }
  });
