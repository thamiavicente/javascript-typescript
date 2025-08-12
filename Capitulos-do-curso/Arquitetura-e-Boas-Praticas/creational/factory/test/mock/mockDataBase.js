class MockDataBase {
    constructor() {
        this.dbData = [{
            name: 'mocker',
            id: 4567,
            birthday: '04-12-1987'
        }]
    }

    connect() {
        return this
    }

    find(query) {
        return this.dbData
    }
}

module.exports = MockDataBase