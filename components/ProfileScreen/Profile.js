import { StyleSheet, Text, View, Image } from 'react-native';
import { userInformation } from '../../data/userInfo'

export default function Profile(props) {
    var img = '../../assets/user.jpg';
    let userData = userInformation[props.id];
    return (
        <>
        <View style={styles.container}>
            <Image source={require(img)} style={styles.image} />
            <Text style={styles.userName}>{userData.name}</Text>
                
            <Text style={styles.achievement}>Điểm: {userData.point} pt</Text>
            <Text style={styles.achievement}>Chuỗi đăng nhập: <Text style={styles.inlineAchie}>{userData.loginStreak} ngày</Text></Text>
            <Text style={styles.achievement}>Nhiệm vụ hoàn thành: <Text style={styles.inlineAchie}>{userData.missionComplete}</Text></Text>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingTop: 20,
        height: 700,
        backgroundColor: 'white',
    },
    userName: {
        fontSize: 32,
        alignSelf: 'center',
    }
    ,
    image:{
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    achievement: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 25,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
    },
    inlineAchie: {
    }
});