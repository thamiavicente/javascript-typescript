'use strict';
const http = require("http")

const DataBaseFactory = require('../entities/factory/dataBaseFactory.js')
const CarService = require('../service/carService.js')
const CustomerService = require('../service/customerService.js')
const CarCategoryService = require('../service/carCategoryService.js')

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const DEFAULT_PORT = 5000

/* REQUEST EXAMPLE:
curl -X POST localhost:5000/rent \
-H "Content-Type: application/json" \
--data '{"customer": "6b003d6d-abd5-4593-9132-8c8963c38c85", "carCategory": "61095917-0946-4d36-8d21-a0f7db57cc9c", "numberOfDays": 3}'
*/

class Api {
    constructor(dependencies = new DataBaseFactory()) {
        this.carService = new CarService({ cars: dependencies.cars })
        this.customerService = new CustomerService({ customers: dependencies.customers })
        this.carCategoryService = new CarCategoryService({ carCategories: dependencies.carCategories })
    }

    getRouteList() {
        return {
            '/rent:post': async (request, response) => {
                for await (const data of request) {
                    try {
                        const { customer, carCategory, numberOfDays } = JSON.parse(data)
                
                        //const customerFounded = await this.customerService.findCustomer(customer)
                        //const carCategoryFounded = await this.carCategoryService.findCarCategory(carCategory)
                        //If the user is searched in the data base, we can not use mocks
                
                        const transition = await this.carService.rent(customer, carCategory, numberOfDays)

                        console.log('200 - Success on renting car')
                        response.writeHead(200, DEFAULT_HEADER)
                        response.write(JSON.stringify({transition}))
                        response.end()
                    } catch(error) {
                        console.error(error)
                        response.writeHead(500, DEFAULT_HEADER)
                        response.end('Got error on renting car')
                    }
                }
            },
        
            '/calculateFinalPrice:post': async (request, response) => {
                for await (const data of request) {
                    try {
                        const { customer, carCategory, numberOfDays } = JSON.parse(data)

                        const finalPrice = await this.carService.calculateFinalPrice(customer, carCategory, numberOfDays)

                        console.log('200 - Success on calculating price')
                        response.writeHead(200, DEFAULT_HEADER)
                        response.write(JSON.stringify({ finalPrice }))
                        response.end()
                    } catch(error) {
                        console.error(error)
                        response.writeHead(500, DEFAULT_HEADER)
                        response.end('Got error on calculating price')
                    }
                }
            },
        
            '/getAvailableCar:post': async (request, response) => {
                for await(const data of request) {
                    try {
                        const { carCategory } = JSON.parse(data)
                        const car = await this.carService.getAvailableCar(carCategory)

                        console.log('200 - Success on getting available car')
                        response.writeHead(200, DEFAULT_HEADER)
                        response.write(JSON.stringify({ car }))
                        response.end()
                    } catch (error) {
                        console.log(error)
                        response.writeHead(500, DEFAULT_HEADER)
                        response.end('Got error on getting available car')
                    }
                }
            },
        
            default: (request, response) => {
                response.writeHead(404)
                return response.end(`Route not found`)
            }
        }
    }

    handler(request, response) {
        const { url, method } = request
        const routeKey = `${url}:${method.toLowerCase()}`
        const routes = this.getRouteList()
        const routeChosen = routes[routeKey] || routes.default
        return routeChosen(request, response)
    }

    initializeServer(port = DEFAULT_PORT) {
        const app = http.createServer(this.handler.bind(this))
            .listen(port, () => console.log('running app on :', port))
        return app
    }
}

if (process.env.NODE_ENV !== 'test') {
    const api = new Api()
    api.initializeServer()
}

module.exports = (dependencies) => new Api(dependencies)