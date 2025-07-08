const http = require("http")
const { once } = require('events')

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
    constructor() {
        const dataBase = new DataBaseFactory()

        this.carService = new CarService({ cars: dataBase.cars })
        this.customerService = new CustomerService({ customers: dataBase.customers })
        this.carCategoryService = new CarCategoryService({ carCategories: dataBase.carCategories })
    }

    getRouteList() {
        return {
            '/rent:post': async (request, response) => {
                try {
                    const { customer, carCategory, numberOfDays } = JSON.parse(await once(request, "data"))
            
                    const customerFounded = await this.customerService.findCustomer(customer)
                    const carCategoryFounded = await this.carCategoryService.findCarCategory(carCategory)
            
                    const transition = await this.carService.rent(customerFounded, carCategoryFounded, numberOfDays)
            
                    console.log('200 - Success')
                    response.writeHead(200, DEFAULT_HEADER)
                    response.end(JSON.stringify(transition))
                } catch(error) {
                    console.error(error)
                    response.writeHead(500, DEFAULT_HEADER)
                    response.end('Got error on renting car')
                }
            },
        
            /* '/calculateFinalPrice:post': (request, response) => {
                return null
            },
        
            'getAvailableCar:post': (request, response) => {
                return null
            },*/
        
            default: (request, response) => {
                response.writeHead(404)
                return response.end(`Route not found`)
            }
        }
    }

    handler(request, response) {
        const { url, method } = request
        const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
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

module.exports = Api