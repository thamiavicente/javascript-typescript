const UserRepository = require('../repository/userRepository')
const Database = require('../utils/database')
const UserService = require('../service/userService')

class UserFactory {
    static async createInstance() {
        const db = new Database({ connectionString: 'mongodb://localhost' })
        const dbConnection = await db.connect()
        const userRepository = await new UserRepository({ dbConnection })
        const userService = await new UserService({ userRepository })

        return userService
    }
}
module.exports = UserFactory