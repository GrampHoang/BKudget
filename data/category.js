import { COLORS } from "../constants/themes";

//import var food = require("../assets/category/food_icon.png");
//import var drink = require("../assets/category/drink_icon.png");
//import var shop = require("../assets/category/shop_icon.png");
//import var bill = require("../assets/category/bill_icon.png");
//import var other = require("../assets/category/other_icon.png");
//import var income = require("../assets/category/income_icon.png");

export let categoriesData = [
    {
        id: 1,
        name: "Đồ ăn",
        icon: require("../assets/category/food_icon.png"),
        color: COLORS.red,
        expenses: [
            {
                id: 1,
                title: "Cơm tấm",
                description: "",
                total: 25000,
            }
        ],
    },
    {
        id: 2,
        name: "Đồ uống",
        icon: require("../assets/category/drink_icon.png"),
        color: COLORS.lightBlue,
        expenses: [],
    },
    {
        id: 3,
        name: "Mua sắm",
        icon: require("../assets/category/shop_icon.png"),
        color: COLORS.yellow,
        expenses: [
            {
                id: 2,
                title: "Đồ chơi",
                description: "toys",
                total: 50000,
            }
        ],
    },
    {
        id: 4,
        name: "Hóa đơn",
        icon: require("../assets/category/bill_icon.png"),
        color: COLORS.purple,
        expenses: [
            {
                id: 3,
                title: "Tiền internet",
                description: "",
                total: 25000,
            }
        ],
    },
    {
        id: 5,
        name: "Khác",
        icon: require("../assets/category/other_icon.png"),
        color: COLORS.peach,
        expenses: [],
    },
    {
        id: 6,
        name: "Thu nhập",
        icon: require("../assets/category/income_icon.png"),
        color: COLORS.lightGreen,
        expenses: [],
    }
]