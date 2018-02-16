export function setPage(page) {
    return {
        type: 'SET_PAGE',
        page: page
    };
}

export function nextPage() {
    return {
        type: 'NEXT_PAGE'
    };
}

export function previousPage() {
    return {
        type: 'PREVIOUS_PAGE'
    };
}

export function setValue(key, value) {
    return {
        type: 'SET_VALUE',
        key,
        value
    };
}

export function setPageValidity(key, valid) {
    return {
        type: 'SET_PAGE_VALIDITY',
        key,
        valid
    };
}