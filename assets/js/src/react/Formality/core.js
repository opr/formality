import {fromJS, isImmutable, List, Map} from 'immutable';
import './schema.js';
import {normalizeState} from './schema';

export const setUpInitialState = config => {
  const nextConfig = isImmutable(config) ? config.toJS() : config;
  return normalizeState(nextConfig);
};

export const changeFieldValue = (state, name, value) => {
  //find the appropriate page -> section -> field to update
  const path = derivePathFromVariableName(state, name);
  return state.setIn(path, value);
};

export const derivePathFromVariableName = (state, name) => {
  const path = searchedItems.get(name, null);
  if (path !== null) {

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      global['memoizationTestFunc']();
    }

    return path;
  }

  const pages = state.get('pages', List([]));
  const foundPath = [];

  //loop through each 'page' in the form to see if any of the sections contain a field with our chosen name
  const pageKey = pages.findKey(page => {

    //loop through the 'sections' within the 'page', to check if any of the fields in here have our name
    const relevantSection = page.get('sections', List([])).findKey(section => {

      //as above, loop through each field in the section to see if the name of the field matches the name we're searching
      const relevantField = section.get('fields', List([])).findKey(field => {
        return field.get('name') === name;
      });

      if (relevantField !== undefined) {
        foundPath.push('value');
        foundPath.push(relevantField);
        foundPath.push('fields');
        return true;
      }

    });

    if (relevantSection !== undefined) {
      foundPath.push(relevantSection);
      foundPath.push('sections');
      return true;
    }
  });

  if (pageKey !== undefined) {
    foundPath.push(pageKey);
    foundPath.push('pages');
    const finalPath = foundPath.reverse();
    searchedItems = searchedItems.set(name, finalPath);
    return finalPath;
  }

  throw new Error(`Searching for a field name that does not exist anywhere in the form. Searched field name was: ${name}`);

};

let searchedItems = Map({});

export const clearListOfSearchedItems = () => {
  searchedItems = Map({});
};
