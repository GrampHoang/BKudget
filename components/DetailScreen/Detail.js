import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { format } from '../Utils/moneyFormat';
export default function Detail(props) {
    var moneystyle = props.type == "Thu nhập" ? styles.moneyplus : styles.moneyminus;
    if (props.type == 'Đồ ăn') { 
        var img = require('../../assets/category/food_icon.png');
    }
    else if (props.type == 'Đồ uống') { 
        var img = require('../../assets/category/drink_icon.png');
    }
    else if (props.type == 'Mua sắm') { 
        var img = require('../../assets/category/shop_icon.png');
    }
    else if (props.type == 'Hóa đơn') { 
        var img = require('../../assets/category/bill_icon.png');
    }
    else if (props.type == 'Khác') { 
        var img = require('../../assets/category/other_icon.png');
    }
    else if (props.type == 'Thu nhập') { 
        var img = require('../../assets/category/income_icon.png');
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
                {format(props.money)}
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
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    content: {
        fontSize: 20,
        flex: 6,
    },
    moneyminus:{
        color: '#E43232',
        fontSize: 16,
        flex: 6,
    },
    moneyplus:{
        color: '#16B830',
        fontSize: 16,
        flex: 6,
    },
    img: {
        height: 40,
        width: 40,
    }
});