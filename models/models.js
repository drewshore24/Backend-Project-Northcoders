const db = require('../db/connection')
const fs = require('fs/promises')
const format = require('pg-format')
const endpoint = require('../endpoints.json')


const selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((data) => {
        return data.rows
    })
}

// `${__dirname}/../endpoints.json`

const selectEndpoint = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf8').then((data) => {
        const parsedData = JSON.parse(data)
        return parsedData
    })
}

module.exports = {selectTopics, selectEndpoint}