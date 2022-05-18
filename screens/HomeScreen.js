import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable, TextInput} from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory-native';
import {Svg} from 'react-native-svg';


import {categoriesData } from '../data/category.js';
import { COLORS } from '../constants/themes.js';

//

const HomeScreen = ({navigation}) => {

  const [categories, setCategories] = React.useState(categoriesData)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categoryName, setcategoryName] = React.useState("");

  function renderCategoryList() {
    //let expenseSum = categories.map((item) => {
    //  let confirmExpenses = item.expenses
    //  var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)
  //
    //  return total
    //})

    const renderItem = ({ item }) => (
      <TouchableOpacity
          onPress={() => [setModalVisible(true), setcategoryName(item.name)]}
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
          {item.expenses.reduce((a, b) => a + (b.total || 0), 0)}
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
      let expenseList = item.expenses
      var total = expenseList.reduce((a, b) => a + (b.total || 0), 0)
      return {
        total: total,
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

  return (
    <View style={styles.container}>
        <Header/>
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
              <Text style={styles.modalTitle}>{categoryName}</Text>
              <TextInput
                placeholder="Mô tả"
                style = {styles.input}
              />
              <TextInput
                placeholder="Số tiền"
                style = {styles.input}
              />
              <Pressable
                style={styles.inputButton}
                onPress={() => setModalVisible(!modalVisible)}
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

const styles = StyleSheet.create({
    header: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#95C0E7',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
    },
    container: {
        flex: 1,
        paddingTop: 0,
        flexDirection: 'column',
        //alignItems: "center",
        justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height: 400,
      width: 300,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 30,
      margin: 20,
    },
    buttontextStyle: {
      color: '#16B830',
      fontSize: 40,
      fontWeight: 'bold', 
      marginTop: 30,
    },
    input: {
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 10,
      width: 245,
      height: 50,
      margin: 10,
      backgroundColor: '#EFEFEF',
      textAlign: 'center',
      fontSize: 20,
    }
});
