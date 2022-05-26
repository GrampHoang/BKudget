import React from 'react';
import OnboardingScreen from './screens/OnboardingScreen.js';
import Home from './screens/Main.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RankingScreen from './screens/RankingScreen.js'
import DetailScreen from './screens/DetailScreen.js'
import MissionsScreen from './screens/MissionsScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';
import { LogBox } from 'react-native';
import { Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthentication } from './Auth/Auth.js';
import Footer from './components/Footer.js';

var pHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = ({navigation}) => {
  return (
      <Stack.Navigator 
        initialRouteName="Login" screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
  );
}

const UserStack = ({navigation}) =>  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Footer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const App = ({navigation}) => {
  LogBox.ignoreLogs(['Require cycle:'])
  LogBox.ignoreLogs(['Setting a timer']);
  const { user } = useAuthentication();
  console.log(user)
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