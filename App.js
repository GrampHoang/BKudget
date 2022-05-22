import React from 'react';
import OnboardingScreen from './screens/OnboardingScreen.js';
import Home from './screens/Main.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Require cycle:'])
LogBox.ignoreLogs(['Setting a timer']);


const Stack = createNativeStackNavigator();

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