import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import OnboardingScreen from './screens/OnboardingScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';


const Stack = createNativeStackNavigator();


const Home = () => {
  return(
    <NavigationContainer independent={true} screenOptions={{headerShown: false}}>
      <Header/>
      <Footer/>
    </NavigationContainer>
  )
}

const App = ({navigation}) => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}





export default App;