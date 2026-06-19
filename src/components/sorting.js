import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            field = action.dataset.field;
            order = sortMap[action.dataset.value];
            action.dataset.value = order;

            // @todo: #3.2 — сбросить сортировки остальных колонок
            Object.values(columns).forEach(btn => {
                if (btn.name === 'sort' && btn !== action) {
                    btn.dataset.value = 'none';
                }
            });
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            const activeBtn = Object.values(columns).find(btn => btn.name === 'sort' && btn.dataset.value !== 'none');
            if (activeBtn) {
                field = activeBtn.dataset.field;
                order = activeBtn.dataset.value;
            }
        }

        return sortCollection(data, field, order);
    }
}