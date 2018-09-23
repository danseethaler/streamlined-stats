import {combineReducers} from 'redux';
import {MatchesType, SetsType} from '../redux.definitions';
import matches from './matches';
import sets from './sets';

export interface RootState {
  matches: MatchesType;
  sets: SetsType;
}

const rootReducer = combineReducers<RootState, any>({
  sets,
  matches,
});

export default rootReducer;
