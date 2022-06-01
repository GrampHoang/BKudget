import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { format } from '../Utils/moneyFormat';
import { COLORS } from "../../constants/themes";
export default function Detail(props) {
    var moneystyle = props.type == "Thu nhập" ? styles.moneyplus : styles.moneyminus;
    if (props.type == 'Đồ ăn') { 
        var img = require('../../assets/category/food_icon.png');
        var color = COLORS.red;
    }
    else if (props.type == 'Đồ uống') { 
        var img = require('../../assets/category/drink_icon.png');
        var color = COLORS.lightBlue;
    }
    else if (props.type == 'Mua sắm') { 
        var img = require('../../assets/category/shop_icon.png');
        var color = COLORS.yellow;
    }
    else if (props.type == 'Hóa đơn') { 
        var img = require('../../assets/category/bill_icon.png');
        var color = COLORS.purple;
    }
    else if (props.type == 'Khác') { 
        var img = require('../../assets/category/other_icon.png');
        var color = COLORS.peach;
    }
    else if (props.type == 'Thu nhập') { 
        var img = require('../../assets/category/income_icon.png');
        var color = COLORS.lightGreen;
    }
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <View style = {{marginHorizontal: 35,backgroundColor: color, justifyContent: 'center', borderRadius: 30}}>
                <Image source={img} style={styles.img}/>
                </View>
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
        margin: 10,
    }
});