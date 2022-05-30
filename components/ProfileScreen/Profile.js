import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, Button} from 'react-native';
// import { userInformation } from '../../data/userInfo'
import React, {useState, useEffect} from "react";
import { db } from '../../firebase.js';
import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore/';
// import { async } from '@firebase/util';
// import { completeDailyMission } from "../../data/localmission";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import { setUserInfo } from '../../data/userInfo';

const postData = async () => {
    const user = await AsyncStorage.getItem('@user');
    await setDoc(doc(db, "user", user), {
        point: 22,
        loginStreak: 33,
        missions: 55,

      });
      await setDoc(doc(db, "user", user, "spendlist", "spend1"), {
        date: 123456,
        id: 1,
        money: 100,
        desciption: "",
      });
}
    const getData = async (userData) => {
        
        const user = await AsyncStorage.getItem('@user');

        // const ColSnap = collection(db, "user")
        // const userList = await getDocs(ColSnap);
        // const data = userList.docs.map((doc) => ({...doc.data(), id: doc.id}));
        // console.log("Users list:")
        // console.log(data)
        
        const Snap = doc(db, "user", user);
        const userDat = await getDoc(Snap);  
        console.log("User Data:", userDat.data());
        // console.log("Curent point",userDat.data().point)
        // console.log("Login Streak",userDat.data().loginStreak)
        // console.log("Missions finished",userDat.data().missions)
        console.log(user)
        userData.name = userDat.data().name
        userData.point = userDat.data().point
        userData.loginStreak = userDat.data().loginStreak
        userData.missionComplete = userDat.data().missionComplete

        // const SpendSnap = collection(db, "user", user, "spendlist");
        // const userSpend = await getDocs(SpendSnap);  
        // const spen = userSpend.docs.map((doc) => ({...doc.data(), id: doc.id}));
        // console.log("Users spending list:")
        // console.log(spen)
        // console.log(spen[0].money)
    }
export default function Profile(props) {
    const [userData,setUserData] = useState([]);   

    useEffect(() => { 
        setUsrData()
    }, []);
    const isFocused = useIsFocused();
    useEffect(() => { 
      if (!isFocused) {
        setUsrData()
      }
    }, [isFocused]);

    async function setUsrData(){
        try {
            const user = await AsyncStorage.getItem('@user');
            if(user != "0"){
                const Snap = doc(db, "user", user);
                const userDat = await getDoc(Snap);
                let temp = userDat.data();
                setUserData(temp);
            }else 
            {
                const userIfJson = await AsyncStorage.getItem('@LocalUser');
                const userr = JSON.parse(userIfJson);
                setUserData(userr[0]);
            }
        }catch(e){

        }
    }
    var img = '../../assets/user.jpg';

    // let userData = userInformation[props.id];

    //var img = '../../assets/user.jpg';
    // let userData = userInformation[props.id];
    //let userData = userInformation[0

    const createTwoButtonAlert = () => {
        
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    return (
        <>
            <View style={styles.container}>
            <TouchableOpacity onPress={()=>{}}>
                    <Image source={require(img)} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.userName}>{userData.name}</Text>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Điểm:</Text>
                <Text style={styles.contentAch}>{userData.point} pt</Text>
            </View>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Chuỗi đăng nhập: </Text>
                <Text style={styles.contentAch}>{userData.loginStreak} ngày</Text>
            </View>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Nhiệm vụ hoàn thành: </Text>
                <Text style={styles.contentAch}>{userData.missionComplete}</Text>
            </View>
            <View style={styles.buttons}>
                <Button title='Getdata'  onPress={getData}/>
            </View>


            <View style={styles.buttons}>
                <Button title='PostData'  onPress={postData}/>
            </View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttons:{
        margin: 10,
    },
    container:{
        flexDirection: 'column',
        paddingTop: 20,
        height: 700,
        backgroundColor: 'white',
    },
    userName: {
        fontSize: 32,
        alignSelf: 'center',
    }
    ,
    image:{
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    achievement: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: "row",
        
    },
    TitleAch: {
        fontSize: 25,
        borderColor: 'black',

    },
    contentAch: {
        fontSize: 25,
        borderColor: 'black',
        textAlign: 'right',
        marginLeft: 'auto'
    }
});