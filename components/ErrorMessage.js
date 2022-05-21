import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
var pwidth = Dimensions.get('window').width; //full width

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <View style={styles.error}>
  <Text style={styles.errorText}>{error}</Text>
  </View>;
};



const styles = StyleSheet.create({
  errorText: {
    marginLeft: "2%",
    marginRight: "2%",
    color: "#D00000",
    fontSize: 15,
    fontWeight: '900',
    alignSelf: "center",
  },
  error: {
    marginTop: 10,
    marginBottom: 10,
    height: 55,
    width: 0.8*pwidth,
    backgroundColor:'#FFDADA',
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ErrorMessage;