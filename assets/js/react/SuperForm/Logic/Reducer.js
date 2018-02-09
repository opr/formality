import {setDefaultVariables, nextPage, previousPage, setPage} from "./Logic";
import {Map} from 'immutable';

export default function reducer(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload;
        case 'SET_DEFAULTS':
            return setDefaultVariables(state);
        case 'NEXT_PAGE':
            return nextPage(state);
        case 'PREVIOUS_PAGE':
            return previousPage(state);
        case 'SET_PAGE':
            return setPage(state, action.page);
    }
    return state;
}