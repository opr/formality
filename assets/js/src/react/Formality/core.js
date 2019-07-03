import {fromJS, isImmutable, List, Map} from 'immutable';
import './schema.js';
import {normalizeState} from './schema';
import {findLinkedFields, isFieldValid} from './validation';

export const setUpInitialState = config => {
  const nextConfig = isImmutable(config) ? config.toJS() : config;
  console.log(config);
  return normalizeState(nextConfig);
};

export const changeFieldValue = (state, id, value) => {
  //find the appropriate page -> section -> field to update
  const key = state.getIn(['data', 'entities', 'fields'], Map({})).findKey(field => field.get('id') === id);
  let nextState = state;
  //find linked fields and run validation on those as a result
  const linkedFields = findLinkedFields(state, key);

  console.log(linkedFields);


  linkedFields.forEach(_linkedField => {
    const id = _linkedField.toString();
    const linkedField = state.getIn(['data', 'entities', 'fields', id]);
    console.log(linkedField, 'is linked to', state.getIn(['data', 'entities', 'fields', key]));
    nextState = nextState.updateIn(['data', 'entities', 'fields', id],
      undefined,
      field => field.set('valid', isFieldValid(state, id, linkedField.get('value', null), linkedField.get('validation'), undefined, value)));

    //isFieldValid(state, id, linkedField.get('value', null), linkedField.get('validation'), undefined, value)
    //console.log('checking field', id, isFieldValid(state, id, linkedField.get('value', null), linkedField.get('validation')));

  });

  //check if the field is valid according to its validation rules!

  return nextState.updateIn(['data', 'entities', 'fields', key],
    undefined,
    field => field.set('dirty', true).set('value', value).set('valid', isFieldValid(state, key, value)));
};

let searchedItems = Map({});

export const clearListOfSearchedItems = () => {
  searchedItems = Map({});
};

export const immutableEqualityCheck = (a, b) => {
  return a.equals(b);
};
