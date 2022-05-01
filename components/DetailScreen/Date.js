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
        var date = props.past + ' ngày trước';
    }
    return (
        <View style={styles.container}>
            <Text style={styles.date}>02</Text>
            <View style={styles.month}>
                <Text style={styles.month}>{date}</Text>
                <Text style={styles.month}>08/2021</Text>
            </View>
            <Text style={moneystyle}>{props.money} Đồng</Text>
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
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
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
        fontSize: 16,
        flex:5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    moneyplus:{
        color: '#45CB85',
        fontSize: 16,
        flex: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});