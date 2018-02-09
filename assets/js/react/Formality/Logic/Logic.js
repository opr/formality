export function updateValue(state, key, value) {
    return state.setIn([key], value);
}

export function setDefaultVariables(state) {
    return state.set('currentPage', state.get('currentPage', 0));
}

export function nextPage(state) {
    return setPage(state, state.get('currentPage', 0) + 1);
}

export function previousPage(state) {
    return setPage(state, state.get('currentPage', 0) - 1);
}

export function setPage(state, page) {
    page = Math.max(0, Math.min(page, state.get('pages').count()-1));
    return state.set('currentPage', page);
}