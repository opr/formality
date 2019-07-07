import {constants} from '../constants/constants';
import {Map} from 'immutable';
import {changeFieldValue, setDirty} from './core';

const reducer = (state = Map({}), action) => {
  switch (action.type) {
    case constants.CHANGE_FIELD_VALUE :
      return changeFieldValue(state, action.payload.name, action.payload.value);
    case constants.SET_DIRTY:
      return setDirty(state, action.payload.name);
    default :
      return state;
  }
};

export default reducer;
