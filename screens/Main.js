import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Footer from "../components/Footer.js";
import { StatusBar } from "expo-status-bar";

const Home = ({navigation}) => {
    return(
      <NavigationContainer independent={true} screenOptions={{headerShown: false}}>
        <StatusBar translucent={false}/>
        {/*<Header value = {format(balance)}/>*/}
        <Footer/>
      </NavigationContainer>
    )
}

export default Home;