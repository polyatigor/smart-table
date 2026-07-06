export function initSearching(searchField) {
    return (query, state, action) => {
        if (state[searchField]) {
            query.q = state[searchField];
        }
        return query;
    }
}