import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import Month from '../components/DetailScreen/Month.js';
import Date from '../components/DetailScreen/Date.js';
import Detail from '../components/DetailScreen/Detail.js';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
        <Header/>
        <Month/>
        <ScrollView>
        <Date money="-500.000" past="0" date="12"/>
          <Detail content='Ăn sáng' money='-20.000' type='food'/>
          <Detail content='Điện nước' money='-398.000' type='bill'/>
          <Detail content='Rượu bia' money='-200.000' type='drink'/>
        <Date money="-500.000" past="1" date="11"/>
          <Detail content='Ăn sáng' money='-20.000' type='food'/>
          <Detail content='Điện nước' money='-398.000' type='bill'/>
          <Detail content='Rượu bia' money='-200.000' type='drink'/>
        <Date money="+2.968.500.000" past="3" date="09"/>
          <Detail content='Ăn sáng' money='-20.000' type='food'/>
          <Detail content='Điện nước' money='-398.000' type='bill'/>
          <Detail content='Rượu bia' money='-200.000' type='drink'/>
          <Detail content='Lương' money='+3.000.000.000' type='salary'/>
        </ScrollView>
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
