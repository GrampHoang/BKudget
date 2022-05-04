import { StyleSheet, Text, View } from 'react-native';

export default function Date(props) {
    var moneystyle = props.money[0] == '+' ? styles.moneyplus : styles.moneyminus;
    if (props.past == 0) {
        var date = "Hôm nay";
    }
    else if (props.past == 1) {
        var date = "Hôm qua";
    }
    else {
        var date = "Ngày " + props.date;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={moneystyle}>{props.money}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: '#95C0E7',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date:{
        color: '#000000',
        fontSize: 30,
        flex: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    month:{
        color: '#000000',
        fontSize: 12,
        flex: 3,
        paddingLeft: 5,
    },
    money:{
        color: '#E43232',
        fontSize: 16,
        flex: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    moneyminus:{
        color: '#E43232',
        fontSize: 24,
        flex: 7,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    moneyplus:{
        color: '#45CB85',
        fontSize: 24,
        flex: 7,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});