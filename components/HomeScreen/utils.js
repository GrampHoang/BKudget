//import {categoriesData} from '../../data/category.js';

function mapExpense(expenses) {
    //console.log(expenses[0])
    let passExpenses = [0,0,0,0,0,0]
    expenses.forEach(item => {
      passExpenses[item.ID] += item.expense
    });
    return passExpenses
}

function totalExpense(categories) {
    return -categories.slice(0,-1).reduce((a, b) => a + b, 0) + categories.slice(-1)[0];
}

export {mapExpense, totalExpense};