const { readFile } = require('fs/promises')
const { errorMessage, successMessage } = require('./messages')
const keys = [ 'nome', 'sobrenome', 'idade', 'cidade']

class File {
    static async validateFile(filePath) {
        const fileContent = await readFile(filePath, "utf8")
        const fileContentJson = JSON.parse(fileContent)

        const validation = this.isFileValid(fileContentJson)
        if(!validation.valid) throw new Error(validation.error)

        return validation
    }

    static isFileValid(fileContent, options = keys, age = 'idade') {
        if(Array.isArray(fileContent))
            return {
                valid: false,
                error: errorMessage.ERROR_MORE_THAN_ONE_USER    
            }

        let isFileMissingValues = false
        options.forEach((option) => {
            if(!fileContent[option])
                return isFileMissingValues = true
        })

        if(isFileMissingValues) 
            return {
                valid: false,
                error: errorMessage.ERROR_MISSING_ATRIBUTE
            }

        if(fileContent[age] < 18)
            return {
                valid: false,
                error: errorMessage.ERROR_USER_UNDER_AGE
            }

        return {
            valid: true,
            message: successMessage
        }
    }
}

module.exports = File