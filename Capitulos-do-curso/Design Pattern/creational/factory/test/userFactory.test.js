const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

const MockDataBase = require('./mock/mockDataBase')

//Mocka a instancia do banco de dados
rewiremock(() => require('../src/utils/database')).with(MockDataBase)

;( async () => {
    const expected = [{
        name: 'MOCKER',
        id: 4567,
        birthday: '04-12-1987'
    }]

    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find('qualquer um')
    deepStrictEqual(result, expected)

    rewiremock.disable()
})()