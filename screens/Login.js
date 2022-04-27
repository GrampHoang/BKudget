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
 
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/favicon.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tên người dùng"
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mật khẩu."
          placeholderTextColor="#000000"
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
      
      <Text style={styles.guest_text}>Đăng nhập với tư cách là khách</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image style={styles.guest} source={require("../assets/favicon.png")} />
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6F3D6",
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    marginBottom: 40,
    width: 60,
    height: 60,
  },
 
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
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
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 200,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#16B830",
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  guest_text: {
    height: 40,
    marginTop: 40,
    marginBottom: 5,
    fontSize:15,
    textDecorationLine: 'underline',
  },

  guest: {
    marginTop: 0,
    width: 40,
    height: 40,
  },
});