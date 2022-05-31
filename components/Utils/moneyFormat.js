export function format (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function moneyInt (value) {
    return parseInt(value.replace(/\,/g,''),10)
}