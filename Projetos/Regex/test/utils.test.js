const { describe, it } = require('mocha')
const { expect } = require('chai')

const { evaluateRegex, InvalidRegexError } = require('../src/utils.js')

describe("Util", () => {
    it("#evaluateRegex should throw an error if regex is unsafe", () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe`)
    })

    it("#evaluateRegex should return true if regex is safe", () => {
        const safeRegex = /^([a-z])$/
        expect(() => evaluateRegex(safeRegex)).to.not.throw
        expect(evaluateRegex(safeRegex)).to.be.deep.equal(safeRegex)
    })
})