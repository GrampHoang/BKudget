import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';

import {categoriesData } from '../data/category.js';

//

const HomeScreen = ({navigation}) => {

  const [categories, setCategories] = React.useState(categoriesData)

  
  function renderCategoryList() {
    //let expenseSum = categories.map((item) => {
    //  let confirmExpenses = item.expenses
    //  var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)
  //
    //  return total
    //})

    const renderItem = ({ item }) => (
      <TouchableOpacity
          //onPress={() => setSelectedCategory(item)}
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
    let expenseSum = categories.map((item) => {
      let confirmExpenses = item.expenses
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)
  
      return total
    })

    const widthAndHeight = 250
    const series = expenseSum
    const sliceColor = categories.map((item) => {item.color})

    return (
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.45}
        coverFill={'#FFF'}
      />
    );
  }

  return (
    <View style={styles.container}>
        <Header/>
        <Text style={styles.header}>0/1.000.000</Text>
        {renderCategoryList()}
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
        //justifyContent: "center",
    },
});
