const BaseRepository = require('../repository/base/baseRepository.js')
const Tax = require('../entities/tax.js')
const Transaction = require('../entities/transaction.js')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })

        this.taxBasedOnAge = Tax.taxesBasedOnAge

        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    getRandomIndex(list) {
        return Math.floor(Math.random() * (list.length))
    }

    getRandomCar(carCategory) {
        const randomCarIndex = this.getRandomIndex(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]
        return carId
    }

    async getAvailableCar(carCategory) {
        const carId = this.getRandomCar(carCategory)
        const car = await this.carRepository.find(carId)
        return car
    }

    calculateFinalPrice(customer, carCategory, numberOfDays) {
        const { age } = customer
        const { price } = carCategory
        const { then: tax } = this.taxBasedOnAge.find(tax =>
            age >= tax.from && age <= tax.to 
        )

        const calculatedPrice = ((tax * price) * numberOfDays)
        const convertedPrice = this.currencyFormat.format(calculatedPrice)

        return convertedPrice
    }

    async rent(customer, carCategory, numberOfDays) {
        const car = await this.getAvailableCar(carCategory)
        const totalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays)

        const today = new Date()
        today.setDate(today.getDate() + numberOfDays)
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        const dueDate = today.toLocaleDateString('pt-br', options)

        const transaction = new Transaction ({
            customer,
            car,
            dueDate,
            totalPrice
        })

        return transaction
    }
}

module.exports = CarService