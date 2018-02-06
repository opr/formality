export function updateValue(state, key, value) {
    return state.setIn([key], value);
}

export function setDefaultVariables(state) {
    if(state.getIn('currentPage')) {
        state.set('currentPage', 0);
    }
}

export function nextPage(state) {
    return setPage(state, state.get('currentPage', 0) + 1);
}

export function previousPage(state) {

}

export function setPage(state, page) {

}