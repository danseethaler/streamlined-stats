import {ADD_GAME, ADD_STAT} from '../constants';

export const addGameAction = game => ({
  type: ADD_GAME,
  game,
});

export const addStatAction = data => {
  const {game, ...stat} = data;

  return {
    type: ADD_STAT,
    game,
    stat,
  };
};
