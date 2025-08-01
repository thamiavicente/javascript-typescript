export default class Person {
    constructor({ id, vehicles, kmTraveled, from, to }) {
        this.id = id
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled
        this.from = from
        this.to = to
    }

    formatted(language) {
        const optionsData = {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }

        const createDateFrom = (date) => {
            const [ year, month, day ] = date.split('-').map(Number)
            return new Date(year, (month - 1), day)
        }

        return {
            id: Number(this.id),
            vehicles: new Intl
                .ListFormat(language, { style: "long", type: "conjunction" })
                .format(this.vehicles),
            kmTraveled: new Intl
                .NumberFormat(language, { style: "unit", unit: "kilometer" })
                .format(this.kmTraveled),
            from: new Intl
                .DateTimeFormat(language, optionsData)
                .format(createDateFrom(this.from)),
            to: new Intl
                .DateTimeFormat(language, optionsData)
               .format(createDateFrom(this.to)),
        }
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' '
        const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
        const person = new Person({
            id,
            vehicles: vehicles.split(','),
            kmTraveled,
            from,
            to
        })

        return person
    }
}