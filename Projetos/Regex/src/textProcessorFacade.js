const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

class TextProcessorFacade {
    #textProcessorFluentAPI

    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPdf() {
        return this.#textProcessorFluentAPI
                    .extractPeopleData()
                    .divideTextInColumns()
                    .removeEmptySpace()
                    .mapPerson()
                    .build()
    }
}

module.exports = TextProcessorFacade