import {categoriesData} from './category';
import { db } from '../firebase.js';
import { collection, getDocs, getDoc, setDoc, doc, updateDoc  } from 'firebase/firestore/';
import {moneyInt, format} from '../components/Utils/moneyFormat.js';

export async function addDatabaseExpense(username, des, amount, ID) {
    const newExpense = {
        ID: ID,
        description: des,
        name: categoriesData[ID].name,
        Date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        expense: amount
    }
    
    const Snap = doc(db, "user", username);
    
    const data = await getDoc(Snap); 
    
    const jsonValueIn = data.data().expenseList
    console.log(jsonValueIn)
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
    await updateDoc(Snap, {
        expenseList: jsonValueOut
    });
    
}

export async function addInitData(username, b, g) {
  await setDoc(doc(db, "user", username), {
    balance: b,
    goal: g
  });
}

export async function updateBalanceData(username, amount) {
  const b = await getDoc(doc(db, "user", user, "balance"));
  await setDoc(doc(db, "user", username), {
    balance: format(moneyInt(b)+amount)
  });
}