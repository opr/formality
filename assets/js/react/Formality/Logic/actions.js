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