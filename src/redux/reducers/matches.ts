import produce from 'immer';
import {ADD_MATCH, UPDATE_MATCH} from '../constants';

const initialState = {};

export default (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_MATCH:
        newState[action.match.id] = action.match;

      case UPDATE_MATCH:
        const currentMatch = newState[action.match.id];
        newState[action.match.id] = {...currentMatch, ...action.match};
    }
  });
