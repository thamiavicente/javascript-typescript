const Service = require("./src/service")
const assert = require("assert")

//Documentation: https://metmuseum.github.io/
const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
const esterBeforeAhasuerus = `${BASE_URL}436453`
const womenPickingOlives = `${BASE_URL}436536`

//Documentation: https://sinonjs.org/
const { createSandbox } = require("sinon")
const sinon = createSandbox()
const mocks = {
    esterBeforeAhasuerus: require("./mocks/esther-before-ahasuerus.json"),
    womenPickingOlives: require("./mocks/women-picking-olives.json")
}

;(async () => {
    //Request to API
    // const service = new Service()
    // const data = await service.makeRequest(esterBeforeAhasuerus)
    // console.log('data:', data)

    //Request to JSON
    const service = new Service()
    const stub = sinon.stub(
        service,
        service.makeRequest.name
    )

    {
        //Ester Before Ahasuerus
        stub
        .withArgs(esterBeforeAhasuerus)
        .resolves(mocks.esterBeforeAhasuerus)

        const expected = {
            title: "Esther before Ahasuerus",
            artistName: "Artemisia Gentileschi",
            artistNationality: "Italian",
            measurements: "273.7 x 208.3" 
        }

        const results = await service.getWorkInformation(esterBeforeAhasuerus)
        assert.deepStrictEqual(results, expected)
        console.log("results:", results)   
    }

    {
        //Women Picking Olives
        stub
        .withArgs(womenPickingOlives)
        .resolves(mocks.womenPickingOlives)

        const expected = {
            title: "Women Picking Olives",
            artistName: "Vincent van Gogh",
            artistNationality: "Dutch",
            measurements: "91.4 x 72.7"
        }

        const results = await service.getWorkInformation(womenPickingOlives)
        assert.deepStrictEqual(results, expected)
        console.log("results:", results)   
    }
})()