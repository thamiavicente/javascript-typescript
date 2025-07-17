import database from '../database.json' with {type: 'json'}

import TerminarController from './terminal-controller.js'
import Person from './person.js'
import Repository from './repository.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminarController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

export async function questionLoop(terminal) {
    try {
        const answer = await terminal.question()

        if(answer === STOP_TERMINAL) {
            terminal.closeTerminal()
            console.log('End of process')
            return
        }

        const person = Person.generateInstanceFromString(answer)
        terminal.updateTable(person.formatted(DEFAULT_LANG))
        await Repository.save(person)
        
        return questionLoop(terminal)

    } catch(error) {
        console.log(error)
    }
}

if (process.env.NODE_ENV !== 'test') {
    await questionLoop(terminalController);
}