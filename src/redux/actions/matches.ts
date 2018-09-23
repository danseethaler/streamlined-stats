import {ADD_MATCH, UPDATE_MATCH} from '../constants';
import {MatchType} from '../redux.definitions';

export const addMatchAction = (match: MatchType) => ({
  type: ADD_MATCH,
  match,
});

export const updateMatchAction = (match: MatchType) => ({
  type: UPDATE_MATCH,
  match,
});
