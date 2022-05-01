import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
export default function Detail(props) {
    var moneystyle = props.money[0] == '+' ? styles.moneyplus : styles.moneyminus;
    if (props.type == 'food') { 
        var img = require('../../assets/food.png');
    }
    else if (props.type == 'drink') { 
        var img = require('../../assets/drink.png');
    }
    else if (props.type == 'shop') { 
        var img = require('../../assets/shop.png');
    }
    else if (props.type == 'bill') { 
        var img = require('../../assets/bill.png');
    }
    else if (props.type == 'other') { 
        var img = require('../../assets/other.png');
    }
    else if (props.type == 'salary') { 
        var img = require('../../assets/salary.png');
    }
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Image source={img} style={styles.img}/>
            </View>
            <Text style={styles.content}>
                {props.content}
            </Text>
            <Text style={moneystyle}>
                {props.money} Đồng
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        height: 60,
        width: 60,
        backgroundColor: '#FFDADA',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    content: {
        fontSize: 20,
        flex: 6,
    },
    moneyminus:{
        color: '#E43232',
        fontSize: 16,
        flex: 4,
    },
    moneyplus:{
        color: '#45CB85',
        fontSize: 16,
        flex: 4,
    },
    img: {
        height: 40,
        width: 40,
    }
});