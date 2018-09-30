import {filter, find} from 'lodash';
import store from '../../../redux';
import {SetType} from '../../../redux/redux.definitions';

export const getMatchSets = (match: string): SetType[] => {
  const {sets} = store.getState();
  return filter(sets, ({matchId}) => matchId === match);
};

export const getMatchSet = (setId: string) => {
  const {sets} = store.getState();
  return find(sets, ({id}) => id === setId);
};
