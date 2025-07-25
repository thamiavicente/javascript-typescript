'use strict';
const Base = require("./base/base.js")

class CarCategory extends Base {
    constructor({ id, name, carIds, price }) {
        super({ id, name })

        this.carIds = carIds
        this.price = price
    }
}

module.exports = CarCategory