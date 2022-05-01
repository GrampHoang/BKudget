import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import User from '../components/RankingScreen/User.js';

export default function RankingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false}/>
        <Header/>
        <Text style={styles.header}>Bảng xếp hạng</Text>
        <ScrollView>
          <User point="212" day="23"/>
          <User point="112" day="19"/>
          <User point="92" day="18"/>
          <User point="76" day="14"/>
          <User point="64" day="12"/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 32,
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
