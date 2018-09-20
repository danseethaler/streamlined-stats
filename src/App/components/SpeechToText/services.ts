import {flatten} from 'lodash';

const jerseyVoiceAlternativesMap = [
  ['0', 'zero', 'xero'],
  ['1', 'one', 'when'],
  ['2', 'two', 'to'],
  ['3', 'three', 'tree', 'free'],
  ['4', 'four', 'for'],
  ['5', 'five', '5:00'],
  ['6', 'six'],
  ['7', 'seven'],
  ['8', 'eight', 'date'],
  ['9', 'nine'],
  ['10', 'ten'],
  ['11', 'eleven'],
  ['12', 'twelve'],
  ['13', 'thirteen'],
  ['14', 'fourteen'],
  ['15', 'fifteen'],
  ['16', 'sixteen'],
  ['17', 'seventeen'],
  ['18', 'eighteen'],
  ['19', 'nineteen'],
  ['20', 'twenty'],
];

export const getJerseyVoiceAlternatives = (jerseys: number[]): string[] =>
  flatten(jerseys.map(jersey => jerseyVoiceAlternativesMap[jersey] || []));
