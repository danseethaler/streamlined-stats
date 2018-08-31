import {sortBy} from 'lodash';
import {PlayerType} from './players';

export const sortByName = (players: PlayerType[]) => sortBy(players, 'name');
