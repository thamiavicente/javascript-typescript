class TextProcessorFluentAPI {

    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI 