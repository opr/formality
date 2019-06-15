import {constants} from '../constants/constants';
import {Map} from 'immutable';
import {changeFieldValue} from './core';

const reducer = (state = Map({}), action) => {
  switch (action.type) {
    case constants.CHANGE_FIELD_VALUE :
      return changeFieldValue(state, action.payload.name, action.payload.value);
    default :
      return state;
  }
};

export default reducer;
