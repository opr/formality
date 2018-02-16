import {Map} from 'immutable';

export function setDefaultVariables(state) {
    return state.set('currentPage', state.get('currentPage', 0)).set('variables', state.get('variables', Map()));
}

function checkAllFieldsValid(state) {
    state.getIn(['pages', state.get('currentPage'), 'fieldValidity'], Map()).mapEntries(e => {
       console.log(e);
    });
}

export function nextPage(state) {
    return setPage(state, state.get('currentPage', 0) + 1);
}

export function previousPage(state) {
    return setPage(state, state.get('currentPage', 0) - 1);
}

export function setPage(state, page) {
    let allowed = true;
    if(!state.get('allowInvalidProgression') && page > state.get('currentPage')) {
        //check if all elements in current page are valid before progressing if the allowInvalidProgression is false
        allowed = checkAllFieldsValid(state);
    }
    return state.set('currentPage', Math.max(0, Math.min(page, state.get('pages').count()-1)));
}

export function setValue(state, key, value) {
    return state.setIn(['variables', key], value);
}

export function setPageValidity(state, key, valid) {
    return state.setIn(['pages', state.get('currentPage'), 'fieldValidity', key], valid);
}