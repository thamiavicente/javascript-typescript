const BaseRepository = require('../repository/base/baseRepository.js')

class CarCategoryService {
    constructor({ carCategories }) {
        this.carCategoryRepository = new BaseRepository({ file: carCategories })
    }

    async findCarCategory(carCategoryId) {
        return await this.carCategoryRepository.find(carCategoryId)
    }
}

module.exports = CarCategoryService