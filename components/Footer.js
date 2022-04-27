import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RankingScreen from '../screens/RankingScreen.js'
import DetailScreen from '../screens/DetailScreen.js'
import MissionsScreen from '../screens/MissionsScreen.js'
import ProfileScreen from '../screens/ProfileScreen.js'
import HomeScreen from '../screens/HomeScreen.js'

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      defaultScreenOptions={"Home"}
      screenOptions={{headerShown: false}}
    >
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Detail" component={DetailScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default Footer;