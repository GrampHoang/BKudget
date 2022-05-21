import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({value}) {
  //const [balance, setBalance] = useState('0');

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 55,
        paddingTop: 10,
        backgroundColor: '#4FC462',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    text:{
        color: '#FFFFFF',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: "bold",
    }
});
