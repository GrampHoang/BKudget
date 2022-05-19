import {categoriesData } from './category';

export function updateData(id, amount, des) {
    categoriesData[id].expenses += amount;
}

export function storeData() {
    
}

export function getCategoryData() {

}