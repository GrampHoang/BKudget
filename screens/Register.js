import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { authenthication } from '../firebase.js';
import ErrorMessage from '../components/ErrorMessage.js';
import { userCredentials, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import onAuthStateChanged from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase.js';
import { setDoc, doc } from "firebase/firestore";
import { useAuthentication } from "../Auth/Auth.js";


var pwidth = Dimensions.get('window').width; //full width
//var height = Dimensions.get('window').heigh t; //full height

const postData = async (username) => {
  const user = await AsyncStorage.getItem('@user');
  await setDoc(doc(db, "user", user), {
      point: 0,
      loginStreak: 1,
      missionComplete: 0,
      goal: "0",
      balance: "0",
      progress: "0",
      name: username,
      expenseList: "",
    });
}

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



export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isIn, setisIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();


  const RegUser = async () => {
    try{
      if (email !== '' && password !== '') {
        await createUserWithEmailAndPassword(authenthication, email, password).then(() => {
          console.log('User account created & signed in!');
          AsyncStorage.setItem('@user', email);
          console.log(username);
          postData(username)
        })
      //   console.log(user.email)
      //   await signInWithEmailAndPassword(authenthication, email, password);
      //   console.log(user.email)
      //   onAuthStateChanged(authenthication, (user) => {
      //     console.log(user.email)
      //     if (user) {
      //       console.log('Loggin in as:',user.email);
      //       AsyncStorage.setItem('@user', user.email);
      //       setDoc(doc(db, "user", user.email), {
      //         point: 0,
      //         loginStreak: 0,
      //         missions: 0,
      //       });
      //       setDoc(doc(db, "user", user.email, "spendlist", "spend1"), {
      //         date: 0,
      //         id: 0,
      //         money: 0,
      //         desciption: "",
      //       });
      //     }
      //  });
      }
    }
      catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setLoginError('Email đã có tài khoản!');
        }
    
        else if (error.code === 'auth/invalid-email') {
          setLoginError('Email không hợp lệ!');
        }
        else if (error.code === 'auth/weak-password') {
          setLoginError('Mật khấu phải ít nhất 6 kí tự!');
        }
        else {
          setLoginError("Lỗi! Hãy xem lại");
        }
        //console.error(error);
        
    }
  }

  {isIn}
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
          placeholder="Tên người dùng"
          placeholderTextColor="#808080"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mật khẩu."
          autoCapitalize="none"
          placeholderTextColor="#808080"
          secureTextEntry={passwordVisibility}
          onChangeText={password => setPassword(password)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
      <Pressable onPress={handlePasswordVisibility} style={styles.eye}>
        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
      </Pressable>
      </View>

      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View> */}
 
      <TouchableOpacity style={styles.loginBtn} onPress={RegUser}>
        <Text style={styles.loginText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, marginTop: 40, marginBottom: 5,}}>
      <Text style={styles.reg_text}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.regBtn_text}>Đăng nhập</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  eye: {
    marginRight: 20,
  },
  container: {
    flex: 1,
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
    width: 40,
    height: 40,
  },
});