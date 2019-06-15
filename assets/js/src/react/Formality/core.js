import {fromJS, isImmutable} from 'immutable';

export const setUpInitialState = config => {
  if (isImmutable(config)) {
    return config;
  }
  return fromJS(config);
};
