import {constants} from '../constants/constants';
import {Map} from 'immutable';

const reducer = (state = Map({}), action) => {
  console.log(state, action);
  switch (action.type) {
    case constants.CHANGE_FIELD_VALUE :
      return state;
    default :
      return state;
  }
};

export default reducer;
