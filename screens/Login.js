import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";

var pwidth = Dimensions.get('window').width; //full width
//var height = Dimensions.get('window').height; //full height

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/favicon.png")} />
      <StatusBar style="auto" />
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
          placeholder="Mật khẩu."
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Quên mật khẩu?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, marginTop: 40, marginBottom: 5,}}>
      <Text style={styles.reg_text}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.regBtn_text}>Đăng kí</Text>
      </TouchableOpacity>
      </View>
        

      <Text style={styles.guest_text}>Hoặc</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image style={styles.guest} source={require("../assets/favicon.png")} />
      </TouchableOpacity>
    </View>
  );
}
 

//E0FFE0: Light green

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFE0",
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: 60,
    height: 60,
  },
 
  inputView: {
    borderColor: "transparent",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: "80%",
    height: 55,
    marginBottom: 20,
  },
 
  TextInput: {
    height: 70,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
  },
});