import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native';
import { getExpenseList } from '../../data/LocalDataHandle';
import { storeExpenseListData } from '../../data/LocalDataHandle';
import { format } from '../Utils/moneyFormat';

export default function Month(props) {
    return (
        <>
        <View style={styles.container}>
            {/* <View style={styles.arrow}>
                <Image source={require('../../assets/left-arrow.png')} style={styles.leftArrow}/>
            </View> */}
            <Text style={styles.text}>Lịch sử thu chi</Text>
            {/* <View style={styles.arrow}>
            <Image source={require('../../assets/right-arrow.png' )} style={styles.rightArrow}/>
            </View> */}
        </View>
        <View style={styles.revenue}>
            <View style={styles.thu}>
                <Text style={styles.revenueHeader}>Thu:</Text>
                <Text style={styles.moneyplus}>{format(props.thu)}</Text>
            </View>
            <View style={styles.chi}>
                <Text style={styles.revenueHeader}>Chi:</Text>
                <Text style={styles.moneyminus}>{format(props.chi)}</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#45CB85',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#FFFFFF',
        fontSize: 30,
        textAlign: 'center',
        flex: 5,
    },
    leftArrow:{
        height: 20,
    },
    rightArrow:{
        height: 20,
    },
    arrow:{
        flex: 2,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    revenue:{
        minHeight: 60,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#A4A4A4",
    },
    thu:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
    },
    chi:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
    },
    moneyminus:{
        fontWeight: "bold",
        color: '#E43232',
        fontSize: 24,
    },
    moneyplus:{
        fontWeight: "bold",
        color: '#16B830',
        fontSize: 24,
    },
    revenueHeader:{
        fontSize: 18,
        color: 'black',
    }
});