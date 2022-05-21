import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, Button } from 'react-native';
import { userInformation } from '../../data/userInfo'
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase.js';
import { async } from '@firebase/util';
import { completeDailyMission } from "../../data/localmission";

export default function Profile(props) {
    var img = '../../assets/user.jpg';
    let userData = userInformation[props.id];

    const getData = async () => {
        const userCol = collection(db, 'user');
        const user = await getDocs(userCol);
        const userlist = user.docs.map(doc => doc.data());
        console.log(userlist);
      }
    
    const createTwoButtonAlert = () => {
        
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    return (
        <>
            <View style={styles.container}>
            <TouchableOpacity onPress={()=>{}}>
                    <Image source={require(img)} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.userName}>{userData.name}</Text>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Điểm:</Text>
                <Text style={styles.contentAch}>{userData.point} pt</Text>
            </View>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Chuỗi đăng nhập: </Text>
                <Text style={styles.contentAch}>{userData.loginStreak} ngày</Text>
            </View>
            <View style={styles.achievement}>
                <Text style={styles.TitleAch}>Nhiệm vụ hoàn thành: </Text>
                <Text style={styles.contentAch}>{userData.missionComplete}</Text>
            </View>
            <View>
                <Button title='Getdata'  onPress={getData}/>
            </View>
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
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: "row",
        
    },
    TitleAch: {
        fontSize: 25,
        borderColor: 'black',

    },
    contentAch: {
        fontSize: 25,
        borderColor: 'black',
        textAlign: 'right',
        marginLeft: 'auto'
    }
});