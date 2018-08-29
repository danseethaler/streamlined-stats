import produce from 'immer';
import {ADD_GAME} from '../constants';

const initialState = {
  games: {},
};

export default (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState.games[action.game.id] = action.game;
    }
  });
