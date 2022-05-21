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
  
export async function completeDailyMission(num) {
    const jsonValueIn = await AsyncStorage.getItem('@DailyMission')
    const jsonValue = JSON.parse(jsonValueIn);
    if (!jsonValue[num]['finished']) { 
        jsonValue[num]['finished'] = true;
        AsyncStorage.setItem(
            '@DailyMission',
            JSON.stringify(jsonValue)
        );
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
export async function clearDaily() {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds();
    if (hours === 0 && min === 0 && sec === 0) {
         const daily = JSON.stringify(dailyMission)
            await AsyncStorage.setItem('@DailyMission', daily)
    }
}






