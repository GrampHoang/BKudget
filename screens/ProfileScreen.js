import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import Profile from '../components/ProfileScreen/Profile'
import { authenthication } from '../firebase.js';
import { getAuth,signOut } from "firebase/auth";
import { setUserInfo } from '../data/userInfo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header.js";
import { useIsFocused } from '@react-navigation/native';

const logOut = async () => {
  signOut(authenthication)
.then(() => console.log('User signed out!'));
  try{
  const user = await AsyncStorage.getItem('@user');
  const check = JSON.parse(user);
  console.log(check)
    if (check == "0") {
      Alert.alert(
        "Bạn đang là khách!",
        "Hãy ấn nút Back 2 lần để trở về màn hình đăng nhập.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    }
    else{
      console.log(user)
    }
  }
  catch(e){

  }
}
export default function DetailScreen({navigation}) {
  
  const isFocused = useIsFocused();
  useEffect(() => { 
    if (isFocused) {    
      setUserInfo();
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
    <StatusBar translucent={false}/>
    <Header value = "0"/>
    <Profile id="0"/>
    <View style={styles.buttons}>
              <Button title='Đăng xuất' 
              color={'#FF4500'} 
              onPress={logOut} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  buttons:{
    margin: 10,
},
    header: {
        height: 60,
        padding: 15,
        backgroundColor: '#FF4500',
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
