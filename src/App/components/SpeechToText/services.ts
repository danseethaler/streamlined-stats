import {flatten} from 'lodash';
import numberAlternates from '../../services/numberAlternates';

export const getJerseyVoiceAlternatives = (jerseys: number[]): string[] =>
  flatten(jerseys.map(jersey => numberAlternates[jersey] || []));
