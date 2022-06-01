import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, getDoc, setDoc, doc} from 'firebase/firestore/';
import { db } from '../firebase.js';

export default function Header({value}) {
  const [balance, setBalance] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
      if(value == "0") 
      {
        getInitData()
      }
  });

  async function getInitData() {
    try {
      const u = await AsyncStorage.getItem('@user')
      if (u != "0" && u != null)
      {
        const Snap = doc(db, "user", u);
        const user = await getDoc(Snap)
        const b = user.data().balance
        if(b !== "0") {
          setBalance(b)
        }
      }
      else
      {
        const b = await AsyncStorage.getItem('@Balance')
        if(b !== "0") {
          setBalance(b)
        }
      }
    } catch(e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {value != '0' ? value : balance} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 55,
        paddingTop: 10,
        backgroundColor: '#4FC462',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    text:{
        color: '#FFFFFF',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: "bold",
    }
});
