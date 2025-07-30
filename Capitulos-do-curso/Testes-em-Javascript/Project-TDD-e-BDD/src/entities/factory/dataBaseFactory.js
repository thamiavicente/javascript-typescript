const { join } = require('path')

class DataBaseFactory {
    constructor() {
        this.cars = join(__dirname, './../../../database', 'cars.json'),
        this.customers = join(__dirname, './../../../database', 'customers.json'),
        this.carCategories = join(__dirname, './../../../database', 'carCategories.json')
    }
}

module.exports = DataBaseFactory