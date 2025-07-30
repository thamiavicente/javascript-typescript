'use strict';
const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')
const { sandbox } = require('sinon')

const CarService = require('../../src/service/carService.js')
const Transaction = require('../../src/entities/transaction.js')
const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json')
}

describe('CarService Suite Tests', () => {
    let carService = {}
    let sandbox = {}

    before(() => {
        carService = new CarService({ cars: carsDatabase })
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Should be possible to get a index randomly', async () => {
        //Make sure that you can choose a random item
        const data = [0, 1, 2, 3, 4]
        const result = await carService.getRandomIndex(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it('Should get the first car from a given category', async () => {
        //Remove the random factor to make sure the gotten car is the same the expected
        //by simulating the result "0" to make sure that you are getting the right car
        const carCategory = mocks.validCarCategory
        const carIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomIndex.name
        ).returns(carIndex)

        const result = await carService.getRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]
        
        expect(carService.getRandomIndex.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
    })

    it('A car category must have an available car', async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]

        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name,
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.getRandomCar.name
        )

        const result = await carService.getAvailableCar(carCategory)
        const expected = car
        
        expect(carService.getRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })

    it('An money amount in real must be returned depending from a carCategory, customer and numberOfDays', async () => {
        const customer = Object.create(mocks.validCustomer)
        customer.age = 27

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5

        sandbox.stub(
            carService,
            "taxBasedOnAge"
        ).get(() => [{ from: 26, to: 30, then: 1.3 }])

        const expected = carService.currencyFormat.format(244.40)
        const result = carService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        )

        expect(result).to.be.deep.equal(expected)
    })

    it('The user must get a recept with price from carCategory and delivery date', async () => {
        const car = mocks.validCar
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        }

        const customer = Object.create(mocks.validCustomer)
        customer.age = 50

        const numberOfDays = 5
        const dueDate = '10 de novembro de 2020'
        const today = new Date(2020, 10, 5)
        sandbox.useFakeTimers(today.getTime())

        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        const expectedTotalPrice = carService.currencyFormat.format(206.8)
        
        const expected = new Transaction({
            customer,
            car,
            dueDate,
            totalPrice: expectedTotalPrice
        })

        const result = await carService.rent(
            customer,
            carCategory,
            numberOfDays
        )

        expect(result).to.be.deep.equal(expected)
    })
})