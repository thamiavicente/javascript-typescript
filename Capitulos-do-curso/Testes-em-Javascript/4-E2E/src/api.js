const http = require("http")
const { once } = require("events")

const USER_DEFAULT = {
    username: "ThamirisAVicente",
    password: "123"
}

const routes = {
    '/logged-area:get': (request, response) => {
        response.write('got user information')
        return response.end()
    },
    '/login:post': async (request, response) => {
        const user = JSON.parse(await once(request, "data"))
        if(user.username.toLowerCase() !== USER_DEFAULT.username.toLowerCase()
        || user.password !== USER_DEFAULT.password) {
            response.writeHead(401)
            response.end("invalid user and/or password")
            return
        }

        response.end("user logged in successfully")
    },
    default: (request, response) => {
        response.writeHead(404)
        return response.end('route not found')
    }
}

function handler(request, response) {
    const { url, method } = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const routeChosen = routes[routeKey] || routes.default
    return routeChosen(request, response)
}

const app = http.createServer(handler)
.listen(4000, () => console.log('running app on 4000'))

module.exports = app