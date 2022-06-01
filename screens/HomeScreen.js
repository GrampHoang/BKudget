import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/HomeScreen/style.js';
import {renderChart} from '../components/HomeScreen/chart.js';
import {mapExpense, totalExpense} from '../components/HomeScreen/utils.js';
import {storeExpenseListDataLocal, updateBalanceLocal, newProgressLocal} from '../data/LocalDataHandle.js';
import {addDatabaseExpense, updateBalanceData, addInitData, newProgressData} from '../data/FireBaseHandle.js';
import {format, moneyInt} from '../components/Utils/moneyFormat.js';
import {getDoc, doc} from 'firebase/firestore/';
import { db } from '../firebase.js';
import { categoriesData } from '../data/category.js';
import Header from "../components/Header.js";

const HomeScreen = ({route, navigation}) => {
  const [categories, setCategories] = useState([0,0,0,0,0,0])
  const [goal, setGoal] = useState('0');
  const [balance, setBalance] = useState('0');
  const [progress, setProgress] = useState('0');
  const [user, setUser] = useState("0")
  
  const [categoryID, setCategoryID] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInit, setInitVisible] = useState(false);
  const [newProgress, setNewProgress] = useState(false);
  const [amount, setAmount] = useState(0);
  const [des, setDes] = useState('');
  //console.log(user)
  useEffect(() => { 
    getData()
    //console.log(route.params?.data)
  },[user]);
  async function getData() {
    try {
      const u = await AsyncStorage.getItem('@user')
      let jsonValue = ""
      if (u != "0")
      {
        const Snap = doc(db, "user", u);
        const userData = await getDoc(Snap)
        jsonValue = userData.data().expenseList
        const g = userData.data().goal
        const b = userData.data().balance
        if(b !== "0") {
          const p = userData.data().progress
          setProgress(p)
          setGoal(g)
          setBalance(b)
        }
        else {
          setInitVisible(true)
        }
      }
      else
      {
        jsonValue = await AsyncStorage.getItem('@Expense_list')  
        const g = await AsyncStorage.getItem('@Goal')
        const b = await AsyncStorage.getItem('@Balance')
        if(b !== "0") {
          const p = await AsyncStorage.getItem('@Progress')
          setProgress(p)
          setBalance(b)
          setGoal(g)
        }
        else {
          setInitVisible(true)
        }
      }
      
      const expenses =  (jsonValue !== null && jsonValue !== "") ? JSON.parse(jsonValue) : [];
      setCategories(mapExpense(expenses))
      setUser(u)
      //console.log(user)
    } catch(e) {
      // error reading value
    }
  }
  function renderCategoryList() {
    //console.log(categories)
    let listdata = categoriesData.map((item)=>{return {...item, expense: categories[item.id]}}) 
    const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => [setModalVisible(true), setCategoryID(item.id)]}
          style={{
              flex: 1,
              flexDirection: 'column',
              alignContent: 'center',
              marginVertical: 5,
          }}
      >
        <Text style = {{textAlign: 'center',marginVertical: 5, fontSize: 18, color: item.color}}>
          {format(item.name)}
        </Text>
        <View style = {{marginHorizontal: 35,backgroundColor: item.color, justifyContent: 'center', borderRadius: 30}}>
          <Image
              source={item.icon}
              style={{
                  width: 40,
                  height: 40,
                  margin: 10,
              }}
          />
        </View>
        <Text style = {{textAlign: 'center',marginVertical: 5, fontSize: 18, color: item.color}}>
          {format(item.expense)}
        </Text>
      </TouchableOpacity>
  )
    return (
        <FlatList
          data={listdata}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns = {3}
        />
    )
  }
  const handleAddExpense = () => {
    if (categoryID !=5 && moneyInt(balance) - amount < 0)
    {
      alert('Số dư hiện tại không đủ')
    }
    else if (amount > 0 && des != '')
    {
      
      let updateCategories = [...categories];
      updateCategories[categoryID] += amount;
      setCategories(updateCategories)
      const expense = amount * (categoryID == 5 ? 1 : -1)
      if (user != "0" && user != null)
      {
        addDatabaseExpense(user, des, amount, categoryID)
        updateBalanceData(user , expense)
      }
      else
      {
        storeExpenseListDataLocal(des, amount, categoryID)
        updateBalanceLocal(expense)
      }
      setAmount(0)
      setDes('')
      setBalance(format(moneyInt(balance)+expense))
      setProgress(format(moneyInt(progress)+expense))
      if (moneyInt(goal) <= (moneyInt(progress)+expense))
      {
        //console.log("congat")
        setProgress(format(expense+moneyInt(progress) - moneyInt(goal)))
        setGoal("0")
        setNewProgress(true)
      }
      setModalVisible(!modalVisible)
    }
    else
    {
      alert('Vui lòng điền đầy đủ thông tin')
    }
  }
  const handleSubmit = () => {
    if (balance > 0 && goal > 0)
    {
      if (user != "0" && user != null)
      {
        addInitData(user,balance, goal)
      }
      else
      {
        saveFinanceInitLocal(balance, goal)
      }
      setInitVisible(false);
    }
    else
    {
      alert('Vui lòng điền đầy đủ thông tin')
      setInitVisible(true)
    }
  }

  const handleNewProgress = () => {
    if (moneyInt(goal) > moneyInt(progress) && goal != "")
    {
      if (user != "0" && user != null)
      {
        newProgressData(user, format(progress), format(goal))
      }
      else
      {
        newProgressLocal(format(goal), format(progress))
      }
      setNewProgress(false)
    }
    else
    {
      alert("Hãy nhập mục tiêu hợp lệ!")
    }
  }

  return (
    <View style={styles.container}>
        <Header value={balance}/>
        <Text style={styles.header}> {progress} / {goal}</Text>
        <View style= {{flex: 1}}>
          {renderChart(categories)}
        </View>
        <View style= {{flex: 1}}>
          {renderCategoryList()}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{categoriesData[categoryID].name}</Text>
              <TextInput
                placeholder="Mô tả"
                style = {styles.input}
                onChangeText={newText => setDes(newText)}
              />
              <TextInput
                placeholder="Số tiền"
                style = {styles.input}
                keyboardType = "numeric"
                onChangeText={newText => setAmount(parseInt(newText))}
              />
              <View style= {{flex: 1, flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <Text style={styles.cancelButton}>Hủy</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleAddExpense()
                }}
              >
                <Text style={styles.submitButton}>Nhập</Text>
              </Pressable>
              
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalInit}
          onRequestClose={() => {
            setInitVisible(!modalInit);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Bắt đầu sử dụng</Text>
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
                onPress={() => {
                  handleSubmit()
                }}
              >
                <Text style={styles.submitButton}>Nhập</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={newProgress}
            onRequestClose={() => {
              setNewProgress(!newProgress)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalViewProgress}>
                <Text style={styles.modalTitle}>Chúc mừng</Text>
                <TextInput
                  placeholder="Nhập mục tiêu mới"
                  style = {styles.input}
                  keyboardType = "numeric"
                  onChangeText={newText => setGoal(format(newText))}
                />
                <Pressable
                  onPress={() => {
                    handleNewProgress()
                  }}
                >
                  <Text style={styles.submitButton}>Nhập</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
    </View>
  )
}
export default HomeScreen;




