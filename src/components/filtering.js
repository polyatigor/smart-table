import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.entries(indexes).forEach(([key, optionsMap]) => {
        const fieldName = 'searchBy' + key.charAt(0).toUpperCase() + key.slice(1, -1); 
        
        const element = elements[fieldName];
        
        if (element && element.tagName === 'SELECT') {
            const uniqueNames = Array.from(new Set(Object.values(optionsMap))).sort();
            
            uniqueNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                element.append(option);
            });
        }
    });

    return (data, state, action) => {
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(item => compare(item, state));
    }
}