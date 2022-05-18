import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Footer from './components/Footer.js';
import OnboardingScreen from './screens/OnboardingScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';

const Stack = createNativeStackNavigator();

const Stack2 = createNativeStackNavigator();
const Home = () => {
  return(
    <NavigationContainer independent={true} screenOptions={{headerShown: false}}>
      <Footer/>
    </NavigationContainer>
)
}


export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding" screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
