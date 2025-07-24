const { describe, it } = require('mocha')
const { expect } = require('chai')
const mock = require('./mock/valid-contract.js')

const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI.js')

describe('Text Processor Fluent API', () => {
    it('#build', () => {
        const result = new TextProcessorFluentAPI(mock)
                            .build()
        
        expect(result).to.be.deep.equal(mock)
    })

    it("#extractPeopleData", () => {
        const result = new TextProcessorFluentAPI(mock)
                            .extractPeopleData()
                            .build()
        
        const expected = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join("\n"),
            [
                "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
                "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. "
            ].join("\n"),
            [
                "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
                "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. "                
            ].join("\n")
        ]

        expect(result).to.be.deep.equal(expected)
    })

    it("#divideTextInColumns", () => {
        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join("\n"),
            [
                "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
                "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. "                
            ].join("\n")
        ]

        const result = new TextProcessorFluentAPI(content)
                            .divideTextInColumns()
                            .build()
        
        const expected = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ],
            [
                "Júlia Menezes",
                " brasileira",
                " solteira",
                " CPF 297.947.800-81",
                " residente e \ndomiciliada a Av. dos Estados",
                " 99",
                " bairro Jardins",
                " São Paulo. "                
            ]
        ]
        
        expect(result).to.be.deep.equal(expected)
    })

    it("#removeEmptySpace", () => {
        const content = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ],
            [
                "Júlia Menezes",
                " brasileira",
                " solteira",
                " CPF 297.947.800-81",
                " residente e \ndomiciliada a Av. dos Estados",
                " 99",
                " bairro Jardins",
                " São Paulo. "                
            ]
        ]

        const result = new TextProcessorFluentAPI(content)
                            .removeEmptySpace()
                            .build()
        
        const expected = [
            [
                "Xuxa da Silva",
                "brasileira",
                "casada",
                "CPF 235.743.420-12",
                "residente e domiciliada a Rua dos bobos",
                "zero",
                "bairro Alphaville",
                "São Paulo."
            ],
            [
                "Júlia Menezes",
                "brasileira",
                "solteira",
                "CPF 297.947.800-81",
                "residente e domiciliada a Av. dos Estados",
                "99",
                "bairro Jardins",
                "São Paulo."                
            ]
        ]

        expect(result).to.be.deep.equal(expected)
    })
})