import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import Profile from '../components/ProfileScreen/Profile'
import { authenthication } from '../firebase.js';
import { getAuth,signOut } from "firebase/auth";
import { setUserInfo } from '../data/userInfo.js';

const logOut = () => {
  signOut(authenthication)
.then(() => console.log('User signed out!'));
}

export default function DetailScreen({navigation}) {
  setUserInfo();

  return (
    <View style={styles.container}>
      <StatusBar translucent={false}/>
      <View style={styles.buttons}>
                <Button title='SignOut' onPress={logOut}/>
      </View>
      <Profile id="0"/>
      

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
