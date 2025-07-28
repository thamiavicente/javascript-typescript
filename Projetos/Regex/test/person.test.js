const { describe, it } = require('mocha')
const { expect } = require('chai')
const Person = require('../src/person.js')
describe("Person", () => {
    it("Should create a person from properties list", () => {
        const content = [
            "Júlia Menezes",
            "brasileira",
            "solteira",
            "CPF 297.947.800-81",
            "residente e domiciliada a Av. dos Estados",
            "99",
            "bairro Jardim Oliveira",
            "São Paulo."                
        ]

        const result = new Person(content)

        const expected = {
            name: "Júlia Menezes",
            nationality: "Brasileira",
            maritalStatus: "Solteira",
            id: "29794780081",
            residence: "Av. dos Estados",
            residenceNumber: "99",
            neighborhood: "Jardim Oliveira",
            city: "São Paulo"
        }

        expect(result).to.be.deep.equal(expected)
    })
})