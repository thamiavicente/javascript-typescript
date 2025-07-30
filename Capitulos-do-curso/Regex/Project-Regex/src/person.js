const { evaluateRegex } = require("./utils")

class Person {
    constructor([
        name,
        nationality,
        maritalStatus,
        id,
        residence,
        residenceNumber,
        neighborhood,
        city
    ]) {
        this.name = name
        this.nationality = this.firstLetterToUpperCase(nationality)
        this.maritalStatus = this.firstLetterToUpperCase(maritalStatus)
        this.id = id.replace(evaluateRegex(/\D/g), '')
        this.residence = residence.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.residenceNumber = residenceNumber
        this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s)\w.*$/)).join()
        this.city = city.replace(/\.$/, '')
    }

    firstLetterToUpperCase(stringToFormat) {
        //poderia ter sido usado o .substring,
        //mas foi feito com regex por ser o tema do módulo

        const stringInGroups = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
        return stringToFormat.replace(stringInGroups, (fullMatch, group1, group2) => {
            //aqui, fullmatch não é necessário,
            //mas se não colocar como parametro
            //não conseguimos pegar o group1
            return `${group1.toUpperCase()}${group2.toLowerCase()}`
        })
    }
}

module.exports = Person