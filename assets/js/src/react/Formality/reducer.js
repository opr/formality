import {constants} from '../constants/constants';
import {Map} from 'immutable';

const reducer = (state = Map({}), action) => {
  switch (action.type) {
    case constants.CHANGE_FIELD_VALUE :
      return state;
    default :
      return state;
  }
};

export default reducer;
