import {combineReducers} from 'redux-immutable';
import formalityReducer from '../Formality/reducer';

const rootReducer = combineReducers({
  /* import your reducers above and add them here*/
  formalityReducer
});

export default rootReducer;
