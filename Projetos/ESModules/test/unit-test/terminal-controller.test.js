import mocha from 'mocha'
const { describe, it, beforeEach, afterEach } = mocha
import chai from 'chai'
const { expect } = chai
import sinon from 'sinon'
const { createSandbox } = sinon
import DraftLog from 'draftlog'
import readline from 'readline'

import chalkTable from 'chalk-table'

import TerminalController from '../../src/terminal-controller.js'

describe('Terminal Controller suit test', () => {   
    let terminal = {}
    let sandbox = {}
    const DEFAULT_LANG = 'pt-BR'
    const mock = [
        {
            "id": "2",
            "vehicles": ["Bicicleta", "Carro", "Onibus"], 
            "kmTraveled": "2045623", 
            "from": "2016-03-12", 
            "to": "2023-06-15"
        },
    ]

    beforeEach(() => {
        terminal = new TerminalController()
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Should print a table when a terminal is initiated', () => {
        DraftLog(console)
        const draftLogMock = sandbox.stub(console, 'draft').returns('consoleDraft')
        const readlineMock = sandbox.stub(readline, 'createInterface').returns('terminalInstance')
        const initTableSpy = sandbox.spy(terminal, 'initializeTable')

        terminal.initializeTerminal(mock, DEFAULT_LANG)

        expect(terminal.terminal).to.equal('terminalInstance')
        expect(initTableSpy.calledOnceWithExactly(mock, DEFAULT_LANG)).to.be.true
        expect(readlineMock.calledOnce).to.be.true
    })

    it('A given message should be displayed on terminal', async () => {
        const MSG = 'Insert information'
        const PERSON = { pessoa: true }

        const question = sandbox
            .stub()
            .callsFake((msg, person) => {
                expect(msg).to.be.deep.equal(MSG)
                person(PERSON)
            })
        
        terminal.terminal = { question }
        
        const result = await terminal.question(MSG)
    
        expect(result).to.be.deep.equal(PERSON)
        expect(question.calledOnce).to.be.true
    })

    it('Should add a person to the data and print the updated table', () => {

        const initialData = [
            { id: '1', vehicles: ['Car'], kmTraveled: '100', from: '2020-01-01', to: '2020-02-01' }
        ]
        
        const newPerson = { id: '2', vehicles: ['Bike'], kmTraveled: '50', from: '2021-01-01', to: '2021-02-01' }

        terminal.data = [...initialData]
        terminal.print = sandbox.stub()
        terminal.updateTable(newPerson)

        expect(terminal.data).to.deep.equal([...initialData, newPerson])

        const expectedTable = chalkTable(
            terminal.getTableOptions(),
            terminal.data
        )

        expect(terminal.print.calledOnceWithExactly(expectedTable)).to.be.true
    })

    it('If user send the quit command, the terminal should close', async () => {   
        terminal.terminal = { close: sinon.fake() }
        terminal.closeTerminal()

        expect(terminal.terminal.close.calledOnce).to.be.true
    })
})