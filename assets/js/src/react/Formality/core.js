import {fromJS, isImmutable, List, Map} from 'immutable';
import './schema.js';
import {normalizeState} from './schema';
import {isFieldValid} from './validation';

export const setUpInitialState = config => {
  const nextConfig = isImmutable(config) ? config.toJS() : config;
  console.log(config);
  return normalizeState(nextConfig);
};

export const changeFieldValue = (state, id, value) => {
  //find the appropriate page -> section -> field to update
  const key = state.getIn(['data', 'entities', 'fields'], Map({})).findKey(field => field.get('id') === id);

  //check if the field is valid according to its validation rules!

    return state.updateIn(['data', 'entities', 'fields', key],
      undefined,
      field => field.set('value', value).set('valid', isFieldValid(state, key, value)));
};

let searchedItems = Map({});

export const clearListOfSearchedItems = () => {
  searchedItems = Map({});
};

export const immutableEqualityCheck = (a, b) => {
  return a.equals(b);
};
