const Fibonacci = require("./src/fibonacci.js")

const { createSandbox } = require("sinon")
const sinon = createSandbox()
const assert = require("assert")

;(async () => {
    const fibonacci = new Fibonacci()

    // Testing Fibonacci trough console
    //const seeNumbers = fibonacci.getNumbers(5)
    //console.log("spy: ", [...seeNumbers])

    const spy = sinon.spy(
        fibonacci,
        fibonacci.getNumbers.name
    )

    const expected = {
        callCount: 6,
        params: [3, 1, 2],
        values: [0, 1, 1, 2, 3]
    }

    const [...seeNumbers] = fibonacci.getNumbers(5)
    assert.strictEqual(spy.callCount, expected.callCount)
    const { args } = spy.getCall(2)
    assert.deepStrictEqual(args, expected.params)
    assert.deepStrictEqual(seeNumbers, expected.values)
})()