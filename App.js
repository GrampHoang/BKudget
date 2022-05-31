import React from 'react';
import OnboardingScreen from './screens/OnboardingScreen.js';
import Home from './screens/Main.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';
import { LogBox } from 'react-native';
import { useAuthentication } from './Auth/Auth.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Require cycle:'])
LogBox.ignoreLogs(['Setting a timer']);

const AuthStack = ({navigation}) => {
  return (
      <Stack.Navigator 
        initialRouteName="Login" screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
  );
}

const App = ({navigation}) => {
  LogBox.ignoreLogs(['Require cycle:'])
  LogBox.ignoreLogs(['Setting a timer']);
  const { user } = useAuthentication();
  return(
    user === "undefined" ?
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="AuthStack" component={AuthStack}/>
      </Stack.Navigator>
    </NavigationContainer>
    :
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;