import AsyncStorage from "@react-native-async-storage/async-storage";

export let userInformation = [
    {
        id: 0,
        name: "Bạn",
        loginStreak: 1,
        missionComplete: 0,
        point: 0
    }
];

export async function setUserInfo(){
    try{
        const isSet = await AsyncStorage.getItem('@LocalUser');
        const test = JSON.parse(isSet);
        if(test===null){
            const data = JSON.stringify(userInformation);
            await AsyncStorage.setItem('@LocalUser',data);
        }
    }catch(e){

    }
}