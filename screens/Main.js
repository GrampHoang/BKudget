import {Text, View, Modal, Pressable, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import {saveFinanceInitLocal} from '../data/LocalDataHandle.js';
import {addInitData} from '../data/FireBaseHandle.js';
import styles from '../components/HomeScreen/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, getDoc, setDoc, doc} from 'firebase/firestore/';
import { db } from '../firebase.js';
import { StatusBar } from "expo-status-bar";
import {format} from '../components/Utils/moneyFormat.js';

const Home = ({navigation}) => {
    const [goalVisible, setGoalVisible] = useState(false);
    const [goal, setGoal] = useState('0');
    const [balance, setBalance] = useState('0');
    const [user, setUser] = useState("0")

    useEffect(() => {
      getInitData()
    }, []);

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
          else {
            setGoalVisible(true)
          }
        }
        else
        {
          const b = await AsyncStorage.getItem('@Balance')
          if(b !== "0") {
            setBalance(b)
          }
          else {
            setGoalVisible(true)
          }
        }
        setUser(u)
        //console.log(user)
      } catch(e) {
        // error reading value
      }
    }

    const handleSubmit = () => {
      if (balance > 0 && goal > 0)
      {
        if (user != "0" && user != null)
        {
          addInitData(user,format(balance), format(goal))
        }
        else
        {
          saveFinanceInitLocal(format(balance), format(goal))
        }
        setBalance(balance)
        setGoalVisible(!goalVisible)
      }
      else
      {
        alert('Vui lòng điền đầy đủ thông tin')
        setGoalVisible(true)
      }
    }

    return(
      <NavigationContainer independent={true} screenOptions={{headerShown: false}}>
        <StatusBar translucent={false}/>
        <Header value = {format(balance)}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={goalVisible}
          onRequestClose={() => {
            setGoalVisible(!goalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Thông tin tài chính của bạn</Text>
              <TextInput
                placeholder="Số dư tài khoản"
                style = {styles.input}
                keyboardType = "numeric"
                onChangeText={newText => setBalance(newText)}
              />
              <TextInput
                placeholder="Mục tiêu tài chính"
                style = {styles.input}
                keyboardType = "numeric"
                onChangeText={newText => setGoal(newText)}
              />
              <Pressable
                style={styles.inputButton}
                onPress={() => {
                  handleSubmit()
                }}
              >
                <Text style={styles.buttontextStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Footer/>
      </NavigationContainer>
    )
}

export default Home;