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
        height: 60,
        backgroundColor: '#E9E9E9',
        borderColor: "#A4A4A4",
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date:{
        color: '#000000',
        fontSize: 24,
        flex: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingLeft: 30,
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
        color: '#16B830',
        fontSize: 24,
        flex: 7,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});