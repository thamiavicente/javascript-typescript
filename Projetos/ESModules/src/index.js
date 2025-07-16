import database from '../database.json' with {type: 'json'}

import TerminarController from './terminal-controller.js'
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminarController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function questionLoop() {
    try {
        const answer = await terminalController.question()

        if(answer === STOP_TERMINAL) {
            terminalController.closeTerminal()
            console.log('End of process')
            return
        }

        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        
        return questionLoop()

    } catch(error) {
        console.log(error)
    }
}

await questionLoop()    