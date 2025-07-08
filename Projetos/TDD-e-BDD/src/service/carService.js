const BaseRepository = require('../repository/base/baseRepository.js')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
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
}

module.exports = CarService