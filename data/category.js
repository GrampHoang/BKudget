import { COLORS } from "../constants/themes";

export let categoriesData = [
    {
        id: 0,
        name: "Đồ ăn",
        icon: require("../assets/category/food_icon.png"),
        color: COLORS.red,
        expense: 0,
    },
    {
        id: 1,
        name: "Đồ uống",
        icon: require("../assets/category/drink_icon.png"),
        color: COLORS.lightBlue,
        expense: 0,
    },
    {
        id: 2,
        name: "Mua sắm",
        icon: require("../assets/category/shop_icon.png"),
        color: COLORS.yellow,
        expense: 0,
    },
    {
        id: 3,
        name: "Hóa đơn",
        icon: require("../assets/category/bill_icon.png"),
        color: COLORS.purple,
        expense: 0,
    },
    {
        id: 4,
        name: "Khác",
        icon: require("../assets/category/other_icon.png"),
        color: COLORS.peach,
        expense: 0,
    },
    {
        id: 5,
        name: "Thu nhập",
        icon: require("../assets/category/income_icon.png"),
        color: COLORS.lightGreen,
        expense: 0,
    }
]
