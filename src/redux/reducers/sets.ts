import produce from 'immer';
import _ from 'lodash';
import {VoiceCommandType} from '../../App/components/SpeechToText/commands';
import wordAlternates from '../../App/services/wordAlternates';
import {
  ADD_SET,
  ADD_STAT,
  CLEAR_ALL_STATS,
  REMOVE_STAT,
  TOGGLE_STAT_FLAG,
  UPDATE_SET,
  UPDATE_STAT,
} from '../constants';
import {SetsType, StatTypes} from '../redux.definitions';

const updatePriorStat = (priorStat, newStat) => {
  // Change BHA to AST on kill
  if (priorStat.shorthand === 'BHA' && newStat.shorthand === 'K') {
    priorStat.shorthand = 'AST';
  }

  // Change BS to BA on double block
  const previousStatIsBlock = ['BS', 'BA'].indexOf(priorStat.shorthand) >= 0;
  if (previousStatIsBlock && newStat.shorthand === 'BS') {
    priorStat.shorthand = 'BA';
    newStat.shorthand = 'BA';
    newStat.adjustment = true;
  }
};

const initialState = {};

export default (state = initialState, action): SetsType =>
  produce(state, newState => {
    if (action.type === ADD_SET) {
      newState[action.setId] = action.set;
      return;
    }

    const actionSet = newState[action.setId];
    if (!actionSet) {
      return;
    }

    const mostRecentStat = actionSet.stats[0];

    switch (action.type) {
      case UPDATE_SET:
        Object.assign(actionSet, action.updates);
        break;

      case UPDATE_STAT:
        if (
          action.stat.type === StatTypes.playerStat ||
          action.stat.type === StatTypes.timeout ||
          action.stat.type === StatTypes.pointAdjustment
        ) {
          const priorStat = actionSet.stats[action.index + 1];
          if (priorStat) {
            updatePriorStat(priorStat, action.stat);
          }
          const currentStat = actionSet.stats[action.index];
          // Get currentState to maintain the timestamp
          actionSet.stats[action.index] = {...currentStat, ...action.stat};
        }

        break;

      case ADD_STAT:
        if (mostRecentStat) {
          updatePriorStat(mostRecentStat, action.stat);
        }

        // TODO: this is a emporary HACK! Build a more robust sytem for
        // "quick-update" commands
        if (action.stat.type === VoiceCommandType.noMatch) {
          if (
            _.intersection(action.stat.results, wordAlternates.ace).length > 0
          ) {
            if (mostRecentStat.shorthand === 'SA') {
              mostRecentStat.shorthand = 'A';
              break;
            }
          }

          if (
            _.intersection(action.stat.results, wordAlternates.error).length > 0
          ) {
            if (mostRecentStat.shorthand === 'SA') {
              mostRecentStat.shorthand = 'SE';
              break;
            }
            if (mostRecentStat.shorthand === 'ATT') {
              mostRecentStat.shorthand = 'E';
              break;
            }
          }

          if (
            _.intersection(action.stat.results, wordAlternates.kill).length > 0
          ) {
            if (mostRecentStat.shorthand === 'ATT') {
              mostRecentStat.shorthand = 'K';
              break;
            }
          }
        }

        actionSet.stats.unshift(action.stat);
        break;

      case REMOVE_STAT:
        actionSet.stats.splice(action.index, 1);
        break;

      case CLEAR_ALL_STATS:
        actionSet.stats = [];
        break;

      case TOGGLE_STAT_FLAG:
        const flagStat = actionSet.stats[action.index];

        if (!flagStat) {
          break;
        }

        if (
          action.flag === 'adjustment' &&
          flagStat.type !== StatTypes.playerStat
        ) {
          break;
        }

        flagStat[action.flag] = !flagStat[action.flag];
        actionSet.stats[action.index] = flagStat;

        break;
    }
  });
