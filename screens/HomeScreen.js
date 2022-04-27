import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Header/>
        <Text> Hello </Text>
    </View>
  )
}


export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: 40,
        borderBottomWidth: 10,
        borderBottomColor: '#FFF000',
    },
    container: {
        flex: 1,
        paddingTop: 30,
  },
});
