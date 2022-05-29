import { dailyMission } from './missionDaily';
import { monthMission } from './missionMonth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export async function resetDaily(){
    // this function resets the daily form to unfinish
    try {        
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        const dateJS = await AsyncStorage.getItem('@dateDaily');
        const data = JSON.parse(dateJS);
        if(year > data['year']){
            const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
        }else if(month > data['month']){
            const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
        }else if(day>data['day']){
            const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
        }
    }catch(e)
    {}
}
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
async function addPoint(point){
    try{
        const jsonValueIn = await AsyncStorage.getItem('@LocalUser')
        const jsonValue = JSON.parse(jsonValueIn); 
        jsonValue[0].point += point;
        jsonValue[0].missionComplete++;
        const value = JSON.stringify(jsonValue);
        await AsyncStorage.setItem('@LocalUser',value);
    }catch(e){

    }
}
export async function completeMonthMission(num){
    const jsonValueIn = await AsyncStorage.getItem('@MonthMission')
    const jsonValue = JSON.parse(jsonValueIn);
    jsonValue[num]['finished'] = true;
    AsyncStorage.setItem(
        '@MonthMission',
        JSON.stringify(jsonValue)
    );
}






