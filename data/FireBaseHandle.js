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
    //console.log(jsonValueIn)
    let expenseList = (jsonValueIn != null && jsonValueIn != "") ? JSON.parse(jsonValueIn) : null;
    
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
  const Snap = doc(db, "user", username);
  await updateDoc(Snap, {
    balance: b,
    goal: g
  });
}

export async function updateBalanceData(username, amount) {
  //console.log(amount)
  const Snap = doc(db, "user", username);    
  const data = await getDoc(Snap); 
  const b = data.data().balance
  const p = data.data().progress
  await updateDoc(Snap, {
    balance: format(moneyInt(b)+amount),
    progress: format(moneyInt(p)+amount)
  });
}

export async function newProgressData(username, progress, goal) {
  //console.log(amount)
  const Snap = doc(db, "user", username);    
  await updateDoc(Snap, {
    progress: progress,
    goal: goal
  });
}