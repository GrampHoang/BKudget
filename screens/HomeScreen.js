import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable, TextInput} from 'react-native';
import Header from '../components/Header.js';
import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory-native';
import {Svg} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/HomeScreen/style.js';

import {categoriesData } from '../data/category.js';
import { COLORS } from '../constants/themes.js';

//


const HomeScreen = ({navigation}) => {

  const [categories, setCategories] = React.useState(categoriesData)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [goalVisible, setGoalVisible] = React.useState(false);
  const [categoryID, setCategoryID] = React.useState(0);

  function setGoal() {
    const firstLaunch = async () => {
      try {
        return await AsyncStorage.getItem(FIRST_LAUNCHED)
      } catch(e) {}
    }
    if (firstLaunch === 'true') 
    {
      setGoalVisible(true);
    }
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
          {item.expense}
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
          text={chartData.slice(-1)[0].total}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30 }}
          x={200} y={140}
          text= {totalExpense}
        />
      </Svg>
    );
  }

  const [amount, setAmount] = React.useState(0);
  const [des, setDes] = React.useState('');
  const handleAddExpense = () => {

  }

  return (
    <View style={styles.container}>
        <Header/>
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
              <Text style={styles.modalTitle}>Nhập mục tiêu tài chính của bạn</Text>
              <TextInput
                placeholder="Số tiền"
                style = {styles.input}
                keyboardType = "numeric"
                onChangeText={newText => setAmount(newText)}
              />
              <Pressable
                style={styles.inputButton}
                onPress={() => {
                  setGoalVisible(!goalVisible)
                }}
              >
                <Text style={styles.buttontextStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Text style={styles.header}>0/1.000.000</Text>
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
                onChangeText={newText => setAmount(newText)}
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




