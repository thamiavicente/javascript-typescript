const { evaluateRegex } = require('./utils.js')
const Person = require('./person.js')
class TextProcessorFluentAPI {

    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi)
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptySpace() {
        const trimSpaceRegex = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(subline => subline.replace(trimSpaceRegex, "")))
        return this
    }

    mapPerson() {
        this.#content = this.#content.map(line => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI 