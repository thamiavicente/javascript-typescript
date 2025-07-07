class Service {
    async makeRequest(url) {
        return (await fetch(url)).json()
    }

    async getWorkInformation(url){
        const data = await this.makeRequest(url)
        const measurementsOverall = data.measurements.find(el => el.elementName === "Overall").elementMeasurements
        return {
            title: data.title,
            artistName: data.artistDisplayName,
            artistNationality: data.artistNationality,
            measurements: `${measurementsOverall.Width} x ${measurementsOverall.Height}`
        }
    }
}

module.exports = Service