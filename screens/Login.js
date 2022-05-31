import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, 
Button, TouchableOpacity, Pressable } from "react-native";
import { authenthication } from '../firebase.js';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import ErrorMessage from '../components/ErrorMessage.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Dimensions } from "react-native";
var pwidth = Dimensions.get('window').width; //full width
//var height = Dimensions.get('window').height; //full height


const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
 
  const oops = (user) =>{
    console.log(user.email)
  }

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(authenthication, email, password);
        onAuthStateChanged(authenthication, (user) => {
          if (user) {
            console.log('Loggin in as:',user.email)
            AsyncStorage.setItem('@user', user.email);
          }
       });
      }
    } catch (error) {
      setLoginError("Email hoặc mật khẩu chưa chính xác");
    }
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/App.png")} />
      <StatusBar style="auto" />
      <View>
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          autoCapitalize='none'
          placeholder="Email"
          placeholderTextColor="#808080"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          autoCapitalize='none'
          placeholder="Mật khẩu."
          placeholderTextColor="#808080"
          secureTextEntry={passwordVisibility}
          onChangeText={password => setPassword(password)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Pressable onPress={handlePasswordVisibility} style={styles.eye}>
        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
      </Pressable>
      </View>
    
      {/* <TouchableOpacity onPress={oops}>
        <Text style={styles.forgot_button}>Quên mật khẩu?</Text>
      </TouchableOpacity> */}
 
      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, marginTop: 40, marginBottom: 5,}}>
      <Text style={styles.reg_text}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.regBtn_text}>Đăng kí</Text>
      </TouchableOpacity>
      </View>
        

      <Text style={styles.guest_text}>Hoặc sử dụng offline:</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image style={styles.guest} source={require("../assets/guest.png")} />
      </TouchableOpacity>
    </View>
  );
}
 

//E0FFE0: Light green

const styles = StyleSheet.create({
  eye: {
    marginRight: 20,
  },

  container: {
    flex: 1,
    // backgroundColor: "#E0FFE0",
    backgroundColor: "#E0FFE0",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: 88,
    height: 97,
  },
 
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#EFEFEF",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: "80%",
    height: 55,
    marginBottom: 20,
  },
 
  TextInput: {
    height: 55,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    fontSize: 15,
  },
 
  forgot_button: {
    height: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 15,
    width: pwidth*0.75,
    textAlign: 'right',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: "#000000"
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10,
    backgroundColor: "#4FC462",
  },
   
  reg_text:{
    fontSize:16,
  },
  
  regBtn_text: {
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#000000',
  },

  
  loginText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 20,
  },


  guest_text: {
    height: 40,
    marginTop: 50,
    marginBottom: 5,
    fontSize:16,
  },

  guest: {
    marginTop: 0,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "black",
  },
});