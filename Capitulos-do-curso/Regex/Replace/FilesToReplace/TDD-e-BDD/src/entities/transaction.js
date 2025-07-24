'use strict';
class Transaction {
    constructor({ customer, car, dueDate, totalPrice }) {
        this.customer = customer
        this.car = car
        this.dueDate = dueDate
        this.totalPrice = totalPrice
    }
}

module.exports = Transaction