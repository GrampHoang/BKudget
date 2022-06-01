import {categoriesData} from './category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moneyInt, format} from '../components/Utils/moneyFormat.js';

export async function storeExpenseListDataLocal(des, amount, ID) {
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
    const jsonValueOut = JSON.stringify(expenseList)
    await AsyncStorage.setItem('@Expense_list', jsonValueOut)
    
  } catch (e) {
    // saving error
  }
}  


export async function saveFinanceInitLocal(balance, goal) {
    try {
      await AsyncStorage.setItem('@Balance', balance)
      await AsyncStorage.setItem('@Goal', goal)
    } catch (e) {
      // saving error
    }
}

export async function updateBalanceLocal(amount) {
  try {
    //console.log("save")
    let b = await AsyncStorage.getItem('@Balance')
    let p = await AsyncStorage.getItem('@Progress')
    //console.log(moneyInt(b))
    //console.log(format(moneyInt(b)+amount))
    await AsyncStorage.setItem('@Balance', format(moneyInt(b)+amount))
    await AsyncStorage.setItem('@Progress', format(moneyInt(p)+amount))
    //await AsyncStorage.setItem('@Balance', '5,000,000')
  } catch (e) {
    // saving error
  }
}

export async function newProgressLocal(goal, progress) {
  try {
    //console.log("save")
    await AsyncStorage.setItem('@Goal', goal)
    await AsyncStorage.setItem('@Progress', progress)
    //await AsyncStorage.setItem('@Balance', '5,000,000')
  } catch (e) {
    // saving error
  }
}


