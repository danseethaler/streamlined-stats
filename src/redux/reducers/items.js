import produce from 'immer';
import {ADD_ITEM} from '../constants';

const initialState = {
  items: [],
};

export default (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_ITEM:
        newState.items.push(action.item);
    }
  });
