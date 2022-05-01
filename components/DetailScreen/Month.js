import { StyleSheet, Text, View } from 'react-native';

export default function Month() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tháng 12 Năm 2021</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        padding: 10,
        backgroundColor: '#45CB85',
    },
    text:{
        color: '#000000',
        fontSize: 22,
        textAlign: 'center',
    }
});