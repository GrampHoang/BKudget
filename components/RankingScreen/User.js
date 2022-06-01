import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

export default function User(props) {
    var img = '../../assets/user.jpg';
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.name}>{props.userName}</Text>
            <Text style={styles.point}>{props.point} điểm</Text>
            <Text style={styles.day}>{props.day} ngày</Text>
        </View>
        <View style={styles.line}/>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center",
        width: "90%",
        height: 60,
        paddingLeft: 10,
        borderColor: "#AAAAAA",
        borderWidth: 1,
    },
    name:{
        fontSize: 22,
        flex: 3.5,
        fontWeight: '700',
    },
    point:{
        fontSize: 22,
        flex: 3.5,
    },
    day:{
        fontSize: 22,
        flex: 3,
    },
    line:{
        alignSelf: 'center',
        width: '90%',
        borderBottomWidth: 0,
        borderBottomColor: 'black',
        marginTop: 0,
    }
});