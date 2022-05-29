import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, Button} from 'react-native';
import { userInformation } from '../../data/userInfo'
import { db } from '../../firebase.js';
import { collection, getDocs, setDoc, doc, getDocFromCache } from 'firebase/firestore/';
import { async } from '@firebase/util';
import { completeDailyMission } from "../../data/localmission";
import { authenthication } from '../../firebase.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { setUserInfo } from '../../data/userInfo';

const logOut = () => {
    signOut()
  .then(() => console.log('User signed out!'));
}

const postData = async () => {
    const user = await AsyncStorage.getItem('@user');
    await setDoc(doc(db, "user", user), {
        point: 69,
        loginStreak: 42,
        missions: 100,
      });
      await setDoc(doc(db, "user", user, "spendlist", "spend1"), {
        date: 123456,
        id: 1,
        money: 100,
        desciption: "",
      });
}

const getData = async () => {
    const user = await AsyncStorage.getItem('@user');
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
    console.log("list all users:")
    console.log(`${doc.id} => ${doc.data()}`);
    });

    const curUser = doc(db, "user", user);
    //const curDoc = await getDocFromCache(curUser);
    console.log("list all users:")
    console.log(curUser.data());
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
            const userIfJson = await AsyncStorage.getItem('@LocalUser');
            const user = JSON.parse(userIfJson);
            setUserData(user[0]);
        }catch(e){

        }
    }
    var img = '../../assets/user.jpg';

    // let userData = userInformation[props.id];

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