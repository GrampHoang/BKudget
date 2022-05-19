import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';



export default function Mission(props) {
    var unfinished = '../../assets/notFinish.png';
    var finished = '../../assets/finish.png';
    // const [descrip, setDescrip] = 
    
    return (
        <TouchableOpacity style={styles.container} >
            <View style={styles.missioncontainer}>
            {   props.finished ? (
            <Image source={require(finished)} style={styles.image} />
            ) : <Image source={require(unfinished)} style={styles.image} />
            }
                <Text style={styles.content}>{props.content}</Text>
                <Text style={styles.point}>{ props.point}</Text>
            </View>
            {/* <Text style={styles.description}>{props.description}</Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: 'blue',
        margin: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
    },
    missioncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: 'blue',
    },
    image:{
        height: 20,
        width: 20,
        marginLeft: 10,
        borderRadius: 10,
    },
    content:{
        fontSize: 25,
        flex: 3.5,
        paddingLeft: 25,
    },
    point: {
        fontSize: 22,
        marginRight: 10,
        // borderColor: 'black',
        // borderWidth: 1,
        // borderRadius: 50,
    },
    description: {
        // display: 'none',
        fontSize: 20,
        padding: 5,
    }
});