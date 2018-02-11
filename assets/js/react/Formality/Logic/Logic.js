import {Map} from 'immutable';

export function setDefaultVariables(state) {
    return state.set('currentPage', state.get('currentPage', 0)).set('variables', state.get('variables', Map()));
}

export function nextPage(state) {
    return setPage(state, state.get('currentPage', 0) + 1);
}

export function previousPage(state) {
    return setPage(state, state.get('currentPage', 0) - 1);
}

export function setPage(state, page) {
    return state.set('currentPage', Math.max(0, Math.min(page, state.get('pages').count()-1)));
}

export function setValue(state, key, value) {
    return state.setIn(['variables', key], value);
}