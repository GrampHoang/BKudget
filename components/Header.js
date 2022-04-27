import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 9,000,000 VND </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        padding: 15,
        backgroundColor: '#16B830',
    },
    text:{
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
    }
});
