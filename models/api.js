const fs = require('fs')

exports.fetchApi = () => {
    return new Promise((resolve, reject) => {   
        fs.readFile('./endpoints.json', (err, endpoints) => {
            if (err) reject(err)
            else resolve(JSON.parse(endpoints))
        })
    })
}