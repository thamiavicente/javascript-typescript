import { writeFile, readFile } from 'fs/promises'

const DEFAULT_FILEPATH = './../database.json'
export default class Repository {
    static async save(data, filePath = DEFAULT_FILEPATH) {
        const { pathname: databaseFile } = new URL(filePath, import.meta.url)
        const currentData = JSON.parse((await readFile(databaseFile)))
        currentData.push(data)
    
        await writeFile(databaseFile, JSON.stringify(currentData))
    }
}
