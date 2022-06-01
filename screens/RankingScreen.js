import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import User from '../components/RankingScreen/User.js';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../firebase.js';
import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore/';
export default function RankingScreen() {
  const [userList,SetuserList] = useState([])
  useEffect(() => {
    const getData = async () => {
      const mail = await AsyncStorage.getItem('@user');
      if (mail != "0") { 
      const ColSnap = collection(db, "user")
      const userList = await getDocs(ColSnap);
      const data = userList.docs.map((doc) => ({...doc.data(), id: doc.id}));
      var data2 = data;
      data2 = data2.sort(function(a, b){return - a.point + b.point});
      SetuserList(data2);
      }
      else {
        SetuserList([]);
      }
    }
    getData().then();
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getData = async () => {
      const mail = await AsyncStorage.getItem('@user');
      if (mail != "0") { 
      const ColSnap = collection(db, "user")
      const userList = await getDocs(ColSnap);
      const data = userList.docs.map((doc) => ({...doc.data(), id: doc.id}));
      var data2 = data;
      data2 = data2.sort(function(a, b){return - a.point + b.point});
      SetuserList(data2);
      }
      else {
        SetuserList([]);
      }
    }
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  function UserList() {
    return ( userList.length > 0 ?
      userList.map((data, index) => <User key={index} point={data.point} userName={data.name} day={data.loginStreak}/>)
      : <Text style={styles.error}>Không có dữ liệu</Text>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent={false}/>
        <Text style={styles.header}>Bảng xếp hạng</Text>
        <ScrollView>
          <UserList/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 30,
        color: "white",
        height: 50,
        backgroundColor: '#4FC462',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    container: {
        flex: 1,
        paddingTop: 0,
    },
    error: {
      textAlign: 'center',
      display: 'flex',
      fontSize: 20,
      marginTop: 10,
      
    }
});
