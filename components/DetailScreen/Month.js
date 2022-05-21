import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native';
import { getExpenseList } from '../../data/financeData';
import { storeExpenseListData } from '../../data/financeData';


export default function Month() {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.arrow}>
                <Image source={require('../../assets/left-arrow.png')} style={styles.leftArrow}/>
            </View>
            <Text style={styles.text}>Tháng 12 Năm 2021</Text>
            <View style={styles.arrow}>
            <Image source={require('../../assets/right-arrow.png' )} style={styles.rightArrow}/>
            </View>
        </View>
        <View style={styles.revenue}>
            <View style={styles.thu}>
                <Text style={styles.revenueHeader}>Thu:</Text>
                <Text style={styles.moneyplus}>+3.000.000</Text>
            </View>
            <View style={styles.chi}>
                <Text style={styles.revenueHeader}>Chi:</Text>
                <Text style={styles.moneyminus}>-100.000</Text>
            </View>
        </View>
        <Button title='test'/>
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
        fontSize: 20,
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