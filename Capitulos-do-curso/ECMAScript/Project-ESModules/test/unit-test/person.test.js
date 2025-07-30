import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai

import Person from '../../src/person.js'

const DEFAULT_LANG = 'pt-BR'

describe('Person suit test', () => {
    it('Given an data, should return a person', () => {
        const data = "2 Bicicleta,Carro,Onibus 2045623 2016-03-12 2023-06-15"

        const person = Person.generateInstanceFromString(data)

        const expected = {
            id: "2",
            vehicles: ['Bicicleta', 'Carro', 'Onibus'],
            kmTraveled: "2045623",
            from: '2016-03-12',
            to: '2023-06-15'
        }

        expect(person).to.be.deep.equal(expected)
    })

    it('Given an data, should return a person with values formatted', () => {
        const data = "2 Bicicleta,Carro,Onibus 2045623 2016-03-12 2023-06-15"

        const person = Person.generateInstanceFromString(data).formatted(DEFAULT_LANG)

        const expected = {
            id: 2,
            vehicles: 'Bicicleta, Carro e Onibus',
            kmTraveled: '2.045.623 km',
            from: '12 de março de 2016',
            to: '15 de junho de 2023'
        }

        expect(person).to.be.deep.equal(expected)
    })
})