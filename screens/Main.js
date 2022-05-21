import {Text, View, Modal, Pressable, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import {saveFinanceInit,storeExpenseData} from '../data/financeData.js';
import styles from '../components/HomeScreen/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [goalVisible, setGoalVisible] = useState(false);
    const [goal, setGoal] = useState('0');
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        firstInit()
        getInitData()
      }, []);

    async function getInitData() {
        try {
          const b = await AsyncStorage.getItem('@Balance')
          if(b !== null) {
            setBalance(b)
            //console.log(userBalance)
          }
        } catch(e) {
          // error reading value
        }
    }
    
    async function firstInit() {
        try {
          const firstLaunched = await AsyncStorage.getItem('@FirstUse');
          if(firstLaunched === null || firstLaunched !== 'false') {
            AsyncStorage.setItem('@FirstUse', 'false');
            setGoalVisible(true)
            storeExpenseData([0,0,0,0,0,0])
          }
        } catch(e) {
          // error reading value
        }
    }

    return(
      <NavigationContainer independent={true} screenOptions={{headerShown: false}}>
        <Header value = {balance}/>
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
                onChangeText={newText => setBalance(format(newText))}
              />
              <TextInput
                placeholder="Mục tiêu tài chính"
                style = {styles.input}
                keyboardType = "numeric"
                onChangeText={newText => setGoal(format(newText))}
              />
              <Pressable
                style={styles.inputButton}
                onPress={() => {
                  saveFinanceInit(balance, goal)
                  setGoalVisible(!goalVisible)
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