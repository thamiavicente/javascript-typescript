class Fibonacci {
    * getNumbers(numbersQuantity, current = 0, next = 1) {
        if(numbersQuantity === 0) return
        yield current
        yield * this.getNumbers(numbersQuantity -1, next, current + next)
    }
}

module.exports = Fibonacci