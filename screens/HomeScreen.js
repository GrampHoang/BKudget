import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/HomeScreen/style.js';
import {renderChart} from '../components/HomeScreen/chart.js';
import {mapExpense, totalExpense} from '../components/HomeScreen/utils.js';
import {storeExpenseListDataLocal, updateBalanceLocal} from '../data/LocalDataHandle.js';
import {addDatabaseExpense, updateBalanceData} from '../data/FireBaseHandle.js';
import {format} from '../components/Utils/moneyFormat.js';
import {getDoc, doc} from 'firebase/firestore/';
import { db } from '../firebase.js';
import { categoriesData } from '../data/category.js';

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState([0,0,0,0,0,0])
  const [goal, setGoal] = useState('0');
  //const [user, setUser] = useState("0")
  const [user, setUser] = useState("0")

  const [categoryID, setCategoryID] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [des, setDes] = useState('');
  //console.log(user)
  useEffect(() => { 
    getData()
  },[user]);
  async function getData() {
    try {
      const u = await AsyncStorage.getItem('@user')
      let jsonValue = ""
      if (u != "0")
      {
        //console.log(u)
        const Snap = doc(db, "user", u);
        const userData = await getDoc(Snap)
        jsonValue = userData.data().expenseList
        setGoal(userData.data().goal)
      }
      else
      {
        jsonValue = await AsyncStorage.getItem('@Expense_list')  
        const g = await AsyncStorage.getItem('@Goal')
        if (g !== null) setGoal(g)
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
              marginVertical: 20,
          }}
      >
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
    if (amount > 0 && des != '')
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
      setModalVisible(!modalVisible)
    }
    else
    {
      alert('Vui lòng điền đầy đủ thông tin')
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}> {format(totalExpense(categories))} / {goal}</Text>
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
              <Pressable
                style={styles.inputButton}
                onPress={() => {
                  handleAddExpense()
                }}
              >
                <Text style={styles.buttontextStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </View>
  )
}
export default HomeScreen;




