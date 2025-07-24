const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')

const DataBaseFactory = require('../../src/entities/factory/dataBaseFactory')
const SERVER_TEST_PORT = 6000

const mocks = {
    validCustomer: require('../mocks/valid-customer.json'),
    validCar: require('../mocks/valid-car.json'),
    validCarCategory: require('../mocks/valid-carCategory.json')
}

describe('Car rental API test suit', () => {
    let app = {}

    before(() => {
        const api = require('../../src/api')
        const dataBase = new DataBaseFactory()
        const instance = api(dataBase)

        app = {
            instance,
            server: instance.initializeServer(SERVER_TEST_PORT)
        }
    })

    describe('/rent:post', () => {
        it('Given a user and a car category, rent a call and return a recept', async () => {
            const car = mocks.validCar

            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }

            const customer = {
                ...mocks.validCustomer,
                age: 20
            }

            const numberOfDays = 5
            const dueDate = new Date()
            dueDate.setDate(dueDate.getDate() + numberOfDays)

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }    

            const body = {
                customer,
                carCategory,
                numberOfDays
            }

            const expected = {
                transition: {
                    customer, 
                    car,
                    totalPrice: app.instance.carService.currencyFormat.format(282.00),
                    dueDate: dueDate.toLocaleDateString('pt-br', options)
                }
            }

            const response = await request(app.server)
                .post('/rent')
                .send(body)
                .expect(200)
                    
            expect(response.body).to.be.deep.equal(expected)

        })
    })

    describe('/calculateFinalPrice:post', () => {
        it('Given a car category, a customer and a number of days, calculate the price to pay', async () => {
            const customer = {
                ...mocks.validCustomer,
                age: 20
            }

            const carCategory = {
                ...mocks.carCategory,
                price: 37.60
            }

            const numberOfDays = 5

            const body = {
                customer,
                carCategory,
                numberOfDays
            }

            const expected = {
                finalPrice: app.instance.carService.currencyFormat.format(282.00)
            }

            const response = await request(app.server)
                .post('/calculateFinalPrice')
                .send(body)
                .expect(200)
            
            expect(response.body).to.be.deep.equal(expected)
        })
    })

    describe('/getAvailableCar:get', () => {
        it('Given a car category, return an available car', async () => {
            const car = mocks.validCar
            const carCategory = {
                ...mocks.validCarCategory,
                carIds: [car.id]
            }

            const body = {
                carCategory
            }

            const response = await request(app.server)
                .post('/getAvailableCar')
                .send(body)
                .expect(200)
            
            const expected = {
                car
            }

            expect(response.body).to.be.deep.equal(expected)

        })
    })
})