import {constants} from '../constants/constants';

export const changeFieldValue = (name, value) => ({type: constants.CHANGE_FIELD_VALUE, payload: {name, value}});
export const setDirty = (name) => ({type: constants.SET_DIRTY, payload: {name}});
