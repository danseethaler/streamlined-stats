import produce from 'immer';
import {forEach} from 'lodash';
import storedState from '../App/pages/Admin/stored_state';
import {LOCAL_STORAGE_KEY} from './constants';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return storedState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return storedState;
  }
};

const sanitizeState = state =>
  produce(state, cleanState => {
    forEach(cleanState.sets, ({stats}) =>
      stats.map(stat => delete stat.audioUrl)
    );
  });

export const saveState = state => {
  try {
    const cleanState = sanitizeState(state);
    const serializedState = JSON.stringify(cleanState);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (error) {
    console.log('Error saving redux state:');
    console.error(error);
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.log('Error clearing redux state:');
    console.error(error);
  }
};
