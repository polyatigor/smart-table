import {sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            field = action.dataset.field;
            order = sortMap[action.dataset.value];
            action.dataset.value = order;

            Object.values(columns).forEach(btn => {
                if (btn.name === 'sort' && btn !== action) {
                    btn.dataset.value = 'none';
                }
            });
        } else {
            const activeBtn = Object.values(columns).find(btn => btn.name === 'sort' && btn.dataset.value !== 'none');
            if (activeBtn) {
                field = activeBtn.dataset.field;
                order = activeBtn.dataset.value;
            }
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null; 
        
        return sort ? Object.assign({}, query, { sort }) : query; 
    }
}