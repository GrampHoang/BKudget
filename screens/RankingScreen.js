import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
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
      const ColSnap = collection(db, "user")
      const userList = await getDocs(ColSnap);
      const data = userList.docs.map((doc) => ({...doc.data(), id: doc.id}));
      var data2 = data;
      data2 = data2.sort(function(a, b){return - a.point + b.point});
      SetuserList(data2);
    }
    getData().then();
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getData = async () => {
      const ColSnap = collection(db, "user")
      const userList = await getDocs(ColSnap);
      const data = userList.docs.map((doc) => ({...doc.data(), id: doc.id}));
      var data2 = data;
      data2 = data2.sort(function(a, b){return - a.point + b.point});
      SetuserList(data2);
    }
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  function UserList() {
    return (
      userList.map((data, index) => <User key={index} point={data.point} day={data.loginStreak}/>)
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
        fontSize: 32,
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
