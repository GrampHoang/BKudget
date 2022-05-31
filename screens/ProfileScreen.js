import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import Profile from '../components/ProfileScreen/Profile'
import { authenthication } from '../firebase.js';
import { getAuth,signOut } from "firebase/auth";
import { setUserInfo } from '../data/userInfo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../App';

const logOut = () => {
  signOut(authenthication)
.then(() => console.log('User signed out!'));
}

export default function DetailScreen({navigation}) {
  setUserInfo();
  const user = AsyncStorage.getItem('@user');
  return (
    user === "0" ?
    <View style={styles.container}>
      <StatusBar translucent={false}/>
      <Profile id="0"/>
    </View>
    :
    <View style={styles.container}>
    <StatusBar translucent={false}/>
    <Profile id="0"/>
    <View style={styles.buttons}>
              <Button title='SignOut' onPress={logOut}/>
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
        backgroundColor: '#16B830',
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
