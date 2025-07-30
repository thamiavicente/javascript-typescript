const { errorMessage } = require('./src/messages')
const File = require('./src/file')
const assert = require('assert')

;(async () => {
    {
        const filePath = './1-Mocks/files/error-more-than-one.json'
        const expected = new Error(errorMessage.ERROR_MORE_THAN_ONE_USER)
        const result = File.validateFile(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './1-Mocks/files/error-empty.json'
        const expected = new Error(errorMessage.ERROR_MISSING_ATRIBUTE)
        const result = File.validateFile(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './1-Mocks/files/error-missing-atribute.json'
        const expected = new Error(errorMessage.ERROR_MISSING_ATRIBUTE)
        const result = File.validateFile(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './1-Mocks/files/error-under-age.json'
        const expected = new Error(errorMessage.ERROR_USER_UNDER_AGE)
        const result = File.validateFile(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './1-Mocks/files/valid-user.json'
        const expected = {
            valid: true,
            message: 'Parabéns, seu arquivo é válido!'
        }
        const result = await File.validateFile(filePath)
        assert.deepEqual(result, expected)
    }    
})()