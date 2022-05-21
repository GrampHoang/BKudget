import {categoriesData} from './category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Month from '../components/DetailScreen/Month';

export function updateData(id, amount, des) {
    categoriesData[id].expenses += amount;
}

export async function storeExpenseData(value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@Expense_data', jsonValue)
  } catch (e) {
    // saving error
  }
}  

export async function storeExpenseListData(des, amount, ID) {
  try {
    const newExpense = {
      ID: ID,
      description: des,
      name: categoriesData[ID].name,
      Date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      expense: amount
    }

    const jsonValueIn = await AsyncStorage.getItem('@Expense_list')
    let expenseList = jsonValueIn != null ? JSON.parse(jsonValueIn) : null;
    
    if (expenseList === null)
    {
      expenseList = [newExpense]
    }
    else 
    {
      expenseList.push(newExpense)
    }
    console.log(expenseList)
    const jsonValueOut = JSON.stringify(expenseList)
    await AsyncStorage.setItem('@Expense_list', jsonValueOut)
    
  } catch (e) {
    // saving error
  }
}  


export async function saveFinanceInit(balance, goal) {
    try {
      await AsyncStorage.setItem('@Balance', balance)
      await AsyncStorage.setItem('@Goal', goal)
    } catch (e) {
      // saving error
    }
}


