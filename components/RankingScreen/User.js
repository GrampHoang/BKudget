import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

export default function User(props) {
    var img = '../../assets/user.jpg';
    return (
        <>
        <View style={styles.container}>
            <Image source={require(img)} style={styles.image}/>
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
        marginTop: 20,
    },
    image:{
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'blue',
        marginRight: 25,
    },
    point:{
        fontSize: 25,
        flex: 3.5,
    },
    day:{
        fontSize: 25,
        flex: 3,
    },
    line:{
        alignSelf: 'center',
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 20,
    }
});