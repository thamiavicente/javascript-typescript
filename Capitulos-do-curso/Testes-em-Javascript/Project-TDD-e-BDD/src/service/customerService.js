const BaseRepository = require('../repository/base/baseRepository.js')

class CustomerService {
    constructor({ customers }) {
        this.customerRepository = new BaseRepository({ file: customers })
    }

    async findCustomer(customerId) {
        return await this.customerRepository.find(customerId)
    }
}

module.exports = CustomerService