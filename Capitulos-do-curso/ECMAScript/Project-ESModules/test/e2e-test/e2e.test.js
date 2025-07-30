import mocha from 'mocha'
const { describe, it, after } = mocha
import sinon from 'sinon'
const { createSandbox } = sinon
import chai from 'chai'
const { expect } = chai
import { writeFile, readFile } from 'fs/promises'

import TerminalController from '../../src/terminal-controller.js'
import Person from '../../src/person.js'
import database from '../database.test.json' with { type: 'json' }
import Repository from '../../src/repository.js'

import { questionLoop } from '../../src/index.js'

const DEFAULT_LANG = 'pt-BR'
const DATABASE = 'database.test.json'

const getDataBaseUpdated = new URL(`../${DATABASE}`, import.meta.url)
const mock = [{"id":1,"vehicles":["Moto","Carro","Caminhão"],"kmTraveled":10000,"from":"2009-01-01","to":"2020-11-26"}]

describe('E2E suit test', () => {
    let terminal = {}
    let sinon = createSandbox()

    after(async () => {
        sinon.restore()
        terminal.closeTerminal()
        await writeFile(getDataBaseUpdated, JSON.stringify(mock))
    })

    it('Should update database when a person is sent', async () => {
        terminal = new TerminalController()
        terminal.initializeTerminal(database, DEFAULT_LANG)

        const personData = "4 Bicicleta,Carro,Onibus 2045623 2016-03-12 2023-06-15"
        const person = Person.generateInstanceFromString(personData)

        const questionStub = sinon.stub(
            terminal,
            'question'
        )
        questionStub.onCall(0).resolves(personData);
        questionStub.onCall(1).resolves(':q');

        const save = Repository.save
        sinon.stub(
            Repository,
            'save'
        ).callsFake(async (data, file) => {
            file = `../test/${DATABASE}`
            return await save(data, file)
        })
        Repository.save(person, 'test-file')

        await questionLoop(terminal)

        const expected = [...database, { ...person } ]
        const databaseUpdated = JSON.parse(await readFile(getDataBaseUpdated))

        expect(databaseUpdated).to.be.deep.equal(expected)
    })
})