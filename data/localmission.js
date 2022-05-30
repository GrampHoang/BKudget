import { dailyMission } from './missionDaily';
import { monthMission } from './missionMonth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase.js';
import { getDoc, setDoc, doc, updateDoc  } from 'firebase/firestore/';

export async function storeMissionData(value) {
    try {
        const data = await AsyncStorage.getItem('@DailyMission');
        const test = JSON.parse(data);
        if (test===null) {
            const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
            const month = JSON.stringify(monthMission)
            await AsyncStorage.setItem('@MonthMission', month)
        }
    } catch (e) {
        // saving error
    }
} 
export async function pleple(){
    const daily = JSON.stringify(dailyMission);
    await AsyncStorage.setItem('@DailyMission', daily);
    const month = JSON.stringify(monthMission);
    await AsyncStorage.setItem('@MonthMission', month);
}

export async function resetDaily(){
    // this function resets the daily form to unfinish
    try {        
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        const dateJS = await AsyncStorage.getItem('@dateDaily');
        const data = JSON.parse(dateJS);
        if(year > data['year']){
            const daily = JSON.stringify(dailyMission);
            await AsyncStorage.setItem('@DailyMission', daily);
            const month = JSON.stringify(monthMission);
            await AsyncStorage.setItem('@MonthMission', month);
        }else if(month > data['month']){
            const daily = JSON.stringify(dailyMission);
            await AsyncStorage.setItem('@DailyMission', daily);
            const month = JSON.stringify(monthMission);
            await AsyncStorage.setItem('@MonthMission', month);
        }else if(day>data['day']){
            const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
        }
    }catch(e)
    {}
}

export async function loginStreak(){
    try {        
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        const dateJS = await AsyncStorage.getItem('@dateDaily');
        const data = JSON.parse(dateJS);
        if(year > data['year']){
        }else if(month > data['month']){
        }else if(day - 1 == data['day']){
            const user = await AsyncStorage.getItem('@user');
            if(user!="0"){
                const Snap = doc(db, "user", user);
                const userDat = await getDoc(Snap);
                let loginStreak;  
                //data get from user database 
                if(!userDat.data().point){
                    loginStreak = 0;
                }else 
                {
                    loginStreak = userDat.data().loginStreak;
                }
                await updateDoc(Snap, {
                    "loginStreak": loginStreak + 1,              
                });
            } else {
                const jsonValueIn = await AsyncStorage.getItem('@LocalUser')
                const jsonValue = JSON.parse(jsonValueIn); 
                jsonValue[0].loginStreak++;
                const value = JSON.stringify(jsonValue);
                await AsyncStorage.setItem('@LocalUser',value);
            }
        }
    }catch(e)
    {}
}
// export async function testUpdateDoc(){
//     const user = await AsyncStorage.getItem('@user');
//                 const Snap = doc(db, "user", user);
//                 const userDat = await getDoc(Snap);
//                 let loginStreak;  
//                 //data get from user database 
//                 if(!userDat.data().point){
//                     loginStreak = 0;
//                 }else 
//                 {
//                     loginStreak = userDat.data().loginStreak;
//                 }
//                 await updateDoc(Snap, {
//                     "loginStreak": loginStreak + 101032012,              
//                 });
// }
export async function setFirstDay(){
    try {
        const isSet = await AsyncStorage.getItem('@dateDaily');
        const test = JSON.parse(isSet);    
        if(test===null){
            console.log(test);
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            let data = {'day': day,
                'month': month, 
                'year': year};
            let date = JSON.stringify(data);
            await AsyncStorage.setItem('@dateDaily',date);
        }        
    }catch(e){

    }
}
  
export async function completeDailyMission(num) {
    try {
        const jsonValueIn = await AsyncStorage.getItem('@DailyMission')
        const jsonValue = JSON.parse(jsonValueIn);
        if (!jsonValue[num]['finished']) { 
            jsonValue[num]['finished'] = true;
            AsyncStorage.setItem(
                '@DailyMission',
                JSON.stringify(jsonValue)
            );
            addPoint(jsonValue[num]['point']);
        }
    }catch(e){

    }
    
}
async function addPoint(poin){
    try{
        const user = await AsyncStorage.getItem('@user');
        if(user!="0"){
            const Snap = doc(db, "user", user);
            const userDat = await getDoc(Snap);
            let point,loginStreak,missionComplete;  
            //data get from user database 
            if(!userDat.data().point){
                point = 0;
                loginStreak = 1;
                missionComplete = 0;
            }else 
            {
                point = userDat.data().point;
                loginStreak = userDat.data().loginStreak;
                missionComplete = userDat.data().missionComplete;
            }
            await updateDoc(doc(db, "user", user), {
                "point": point + poin,
                "loginStreak": loginStreak,
                "missionComplete": missionComplete + 1               
            });
        } else {
            const jsonValueIn = await AsyncStorage.getItem('@LocalUser')
            const jsonValue = JSON.parse(jsonValueIn); 
            jsonValue[0].point += point;
            jsonValue[0].missionComplete++;
            const value = JSON.stringify(jsonValue);
            await AsyncStorage.setItem('@LocalUser',value);
        }
    }catch(e){

    }
}
export async function completeMonthMission(num){
    const jsonValueIn = await AsyncStorage.getItem('@MonthMission')
    const jsonValue = JSON.parse(jsonValueIn);
    if (!jsonValue[num]['finished']) { 
        jsonValue[num]['finished'] = true;
        AsyncStorage.setItem(
            '@MonthMission',
            JSON.stringify(jsonValue)
        );
        addPoint(jsonValue[num]['point']);
    }
}






