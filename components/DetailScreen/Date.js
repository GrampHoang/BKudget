import { StyleSheet, Text, View } from 'react-native';
import { format } from '../Utils/moneyFormat';

export default function Day(props) {
    var moneystyle = props.money > 0 ? styles.moneyplus : styles.moneyminus;
    if (props.month < 10) {
        var date = props.date + '/0' + props.month + '/' + props.year;
    }
    else
    var date = props.date + '/' + props.month + '/' + props.year;
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={moneystyle}>{format(props.money)}</Text>
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
        paddingHorizontal: 20
    },
    date:{
        color: '#000000',
        fontSize: 20,
        flex: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingLeft: 15,
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
        textAlign: 'right',
        marginRight: 10,
    },
    moneyplus:{
        color: '#16B830',
        fontSize: 24,
        flex: 7,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 10,
    },
});