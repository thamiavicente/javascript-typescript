const { faker } = require('@faker-js/faker')
const { join } = require('path')
const seederBaseFolder = join(_dirname, "../", "database")

const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Customer = require('../src/entities/customer')

const CARS_AMOUNT = 2

const carCategory = new CarCategory({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

for(let quantity = 0; quantity < CARS_AMOUNT; quantity++) {
    const car = new Car({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        releaseYear: faker.date.past().getFullYear(),
        available: true,
        gasAvailable: true
    })
}