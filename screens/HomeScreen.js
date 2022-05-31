import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { VictoryPie, VictoryLabel } from 'victory-native';
import {Svg} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/HomeScreen/style.js';
import {categoriesData} from '../data/category.js';
import { COLORS } from '../constants/themes.js';
import {storeExpenseListDataLocal, updateBalanceLocal} from '../data/LocalDataHandle.js';
import {addDatabaseExpense, updateBalanceData} from '../data/FireBaseHandle.js';
import {format} from '../components/Utils/moneyFormat.js';
import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore/';
import { db } from '../firebase.js';

//

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState(categoriesData)
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryID, setCategoryID] = useState(0);
  const [goal, setGoal] = useState('0');
  //const [user, setUser] = useState("0")
  const [user, setUser] = useState("123456@gmail.com")
  const [userData, setUserData] = useState(null)
  //const componentMounted = useRef(true);

  useEffect(() => {
    //getUser()
    //setUser()
    getCategoryData()
    getInitData()
    
  }, []);

  function mapExpense(expenses) {
    let passExpenses = [...categories]
    expenses.forEach(item => {
      passExpenses[item.ID].expense += item.expense
    });
    setCategories(passExpenses)
  }

  async function getUser() {
    try {
      const u = await AsyncStorage.getItem('@user')
      setUser(u)
    } catch(e) {
      // error reading value
    }
  }

  async function getInitData() {
    try {
      if (user != "0" && user != null)
      {
        const Snap = doc(db, "user", user);
        const data = await getDoc(Snap)
        setUserData(data.data()); 
        setGoal(userData.goal)

      }
      else
      {
        const g = await AsyncStorage.getItem('@Goal')
        if(g !== null) {
          setGoal(g)

        }
      }
    } catch(e) {
      // error reading value
    }
  }

  async function getCategoryData() {
    try {
      let jsonValue = ""
      if (user != "0" && user != null)
      {
        jsonValue = userData.expenseList
        //console.log(jsonValue)
      }
      else
      {
        jsonValue = await AsyncStorage.getItem('@Expense_list')
      }
      const expenses =  jsonValue != null ? JSON.parse(jsonValue) : null;
      mapExpense(expenses)
    } catch(e) {
      // error reading value

    }
  }

  function totalExpense() {
    return -categories.slice(0,-1).reduce((a, b) => a + b.expense, 0) + categories.slice(-1)[0].expense;
  }

  function renderCategoryList() {

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
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns = {3}
        />
    )
  }

  function renderChart() {
    let chartData = categories.map((item) => {
      return {
        total: item.expense,
        color: item.color
      }
    })
    
    // filter out categories with no data/expenses
    let filterChartData = chartData.slice(0,-1).filter(a => a.total > 0)

    //console.log(filterChartData);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.total || 0), 0)

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        return {
          y: item.total,
        }
    })

    let chartColors = filterChartData.map((item) => item.color)

    return (
      <Svg>
        <VictoryPie
          standalone={false}
          width={400} height={300}
          colorScale = {chartColors}
          data={finalChartData}
          innerRadius={110} 
          radius = {120}
          style={{ labels: { display: "none" } }}
          startAngle = {30}
          endAngle = {390}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 25, fill: COLORS.lightGreen}}
          x={200} y={180}
          text={format(chartData.slice(-1)[0].total)}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={200} y={140}
          text= {format(totalExpense)}
        />
      </Svg>
    );
  }

  const [amount, setAmount] = useState(0);
  const [des, setDes] = useState('');
  const handleAddExpense = () => {
    if (amount > 0 || des != '')
    {
      //console.log(amount)
      let updateCategories = [...categories];
      updateCategories[categoryID].expense += amount;
      setCategories(updateCategories)
      setAmount(amount * (categoryID == 5 ? 1 : -1))
      if (user != "0" && user != null)
      {
        addDatabaseExpense(user, des, amount, categoryID)
        updateBalanceData(user , amount)
      }
      else
      {
        storeExpenseListDataLocal(des, amount, categoryID)
        updateBalanceLocal(amount)
        //console.log("fdf")
      }
      setAmount(0)
      setDes('')
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}> {format(totalExpense())} / {goal}</Text>
        <View style= {{flex: 1}}>
          {renderChart()}
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
                  setModalVisible(!modalVisible)
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




