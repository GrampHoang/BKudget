import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';

export default function MissionsScreen() {
  return (
    <View style={styles.container}>
        <Header/>
        <Text> List of missions, daily and monthly </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 15,
        backgroundColor: '#16B830',
    },
    container: {
        flex: 1,
        paddingTop: 0,
  },
});
