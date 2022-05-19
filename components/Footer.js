import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RankingScreen from '../screens/RankingScreen.js'
import DetailScreen from '../screens/DetailScreen.js'
import MissionsScreen from '../screens/MissionsScreen.js'
import ProfileScreen from '../screens/ProfileScreen.js'
import HomeScreen from '../screens/HomeScreen.js'
import { Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

var pwidth = Dimensions.get('window').width; //full width
var pHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      initialRouteName = "Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#748c94',
        tabBarActiveTintColor: '#4FC462',
        tabBarStyle: {
          height: pHeight * 0.07,
        },
        tabBarIconStyle: {
          top: 2,
        },
        tabBarLabelStyle: {
          paddingBottom: 1,
        },
      }}>
      <Tab.Screen name="Missions" component={MissionsScreen} options={{
          tabBarLabel: 'Nhiệm vụ',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="checkbox-outline" size={size} color={color} />;
          },
        }}/>
      <Tab.Screen name="Ranking" component={RankingScreen} options={{
          tabBarLabel: 'Xếp hạng',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="trophy" size={size} color={color} />;
          },
        }}/>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Trang chính',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="pie-chart" size={size} color={color} />;
          },
        }}/>
      <Tab.Screen name="Detail" component={DetailScreen} options={{
          tabBarLabel: 'Lịch sử',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="reader" size={size} color={color} />;
          },
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({color, size}) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
        }}/>
    </Tab.Navigator>
  );
}


export default Footer;