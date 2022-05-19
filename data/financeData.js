import {categoriesData } from './category';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function updateData(id, amount, des) {
    categoriesData[id].expenses += amount;
}

export function storeData() {
    
}

export function getCategoryData() {

}

export function totalExpense() {
    return -categoriesData.slice(0,-1).reduce((a, b) => a + b.expense, 0) + categoriesData.slice(-1)[0].expense;
}

export async function saveFinanceInit(balance, goal) {
    try {
      await AsyncStorage.setItem('@Balance', balance)
      await AsyncStorage.setItem('@Goal', goal)
    } catch (e) {
      // saving error
    }
}
