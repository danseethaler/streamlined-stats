import {combineReducers} from 'redux';
import {GamesRedux} from '../redux.definitions';
import games from './games';

interface ReducerState {
  games: GamesRedux;
}

const rootReducer = combineReducers<ReducerState, any>({
  games,
});

export default rootReducer;
