import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import Month from '../components/DetailScreen/Month.js';
import Day from '../components/DetailScreen/Date.js';
import Detail from '../components/DetailScreen/Detail.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import { async } from '@firebase/util';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
  // var dataList;
  // getDetailList();
  // async function getDetailList() {
  //   var data = await AsyncStorage.getItem('@Expense_list');
  //   data = JSON.parse(data);
  //   dataList = data.reverse();
  // }
  // function checkExistDate(date, arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     var temp = new Date(arr[i].year, arr[i].month, arr[i].Date);
  //     if (date - temp == 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // function getDateList() {
  //   var arr = [{Date: dataList[0].Date, month: dataList[0].month, year: dataList[0].year}];
  //   var temp = new Date(arr[0].year, arr[0].month, arr[0].Date);
  //   var exist = arr;
  //   for (let i = 1; i < dataList.length; i++) {
  //     var x = new Date(dataList[i].year, dataList[i].month, dataList[i].Date);
  //     if (x - temp != 0 && !checkExistDate(x, exist)) {
  //       temp = x;
  //       arr.push({Date: dataList[i].Date, month: dataList[i].month, year: dataList[i].year});
  //       exist.push({Date: dataList[i].Date, month: dataList[i].month, year: dataList[i].year});
  //     }
  //   }
  //   return arr;
  // }


  // function getDataByDate(date, month, year) {
  // var arr = [];
  // for (let i = 0; i < dataList.length; i++) {
  //   if (date == dataList[i].Date && month == dataList[i].month && year == dataList[i].year){
  //     arr.push(dataList[i]);
  //   }
  // }
  // return arr;
  // }

  

  // function RenderDailyList(date) {
  //   var arr = getDataByDate(date.date, date.month, date.year);
  //   return (
  //     arr.map((data, index) => <Detail key={index} content={data.description} money={data.expense} type="food"></Detail>)
  //   )
  // }
  // function MoneyByDate(date, month, year) {
  //   var arr = getDataByDate(date.date, date.month, date.year);
  //   let sum = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     sum += arr[i].expense;
  //   }
  // }


  // var dataList2;
  // async function getDetailList() {
  //   var data = await AsyncStorage.getItem('@Expense_list');
  //   data = JSON.parse(data);
  //   dataList2 = data.reverse();
  // }
  // getDetailList();
  //getDetailList();
  export default function DetailScreen() {
    var [dataList,SetdataList] = useState();
    useEffect(() => {
      const getData = async () => {
        const resp = await AsyncStorage.getItem('@Expense_list');
        const json = JSON.parse(resp);
        SetdataList(json);
      }
      getData();
    }, []);
    const isFocused = useIsFocused();
    useEffect(() => {
      const getData = async () => {
        const resp = await AsyncStorage.getItem('@Expense_list');
        const json = JSON.parse(resp);
        SetdataList(json);
      }
      if (isFocused) {
        getData();
      }
    }, [isFocused]);
  
  function checkExistDate(date, arr) {
    for (let i = 0; i < arr.length; i++) {
      var temp = new Date(arr[i].year, arr[i].month, arr[i].Date);
      if (date - temp == 0) {
        return true;
      }
    }
    return false;
  }
  function getDateList() {
    if (dataList == null) return [];
    if (dataList.length == 0) return [];
    var arr = [{Date: dataList[0].Date, month: dataList[0].month, year: dataList[0].year}];
    var temp = new Date(arr[0].year, arr[0].month, arr[0].Date);
    var exist = arr;
    for (let i = 1; i < dataList.length; i++) {
      var x = new Date(dataList[i].year, dataList[i].month, dataList[i].Date);
      if (x - temp != 0 && !checkExistDate(x, exist)) {
        temp = x;
        arr.push({Date: dataList[i].Date, month: dataList[i].month, year: dataList[i].year});
        exist.push({Date: dataList[i].Date, month: dataList[i].month, year: dataList[i].year});
      }
    }
    return arr;
  }


  function getDataByDate(date, month, year) {
  var arr = [];
  for (let i = 0; i < dataList.length; i++) {
    if (date == dataList[i].Date && month == dataList[i].month && year == dataList[i].year){
      arr.push(dataList[i]);
    }
  }
  return arr;
  }

  function RenderDailyList(date) {
    var arr = getDataByDate(date.date, date.month, date.year);
    return (
      arr.map((data, index) => <Detail key={index} content={data.description} money={data.expense} type="food"></Detail>)
    )
  }
  function MoneyByDate(date, month, year) {
    var arr = getDataByDate(date, month, year);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].expense;
    }
    return sum;
  }
  function test() {
    // RenderDailyList(22,5,2022);
    }
  var datelist = getDateList();
  return (
    <View style={styles.container}>
        <Header/>
        <Month/>
        {
         dataList == null ? <Text>Không có dữ liệu</Text> :<FlatList 
        data = {datelist}
        renderItem = {({item}) =><><Day money={-MoneyByDate(item.Date,item.month,item.year)} past="5" date={item.Date}></Day>
        <RenderDailyList date={item.Date} month={item.month} year={item.year}/>
        </>
        }>
        </FlatList>}
        <Button title='Refresh' onPress={test}/>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        padding: 15,
        backgroundColor: '#26B830',
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
