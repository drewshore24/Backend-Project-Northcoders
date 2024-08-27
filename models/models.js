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


const selectEndpoint = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf8').then((data) => {
        const parsedData = JSON.parse(data)
        return parsedData
    })
}

const selectArticleID = (id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((data) => {
        if(data.rows.length === 0){
            return Promise.reject({
              status: 404,
              msg: 'article does not exist'
            })
        }
        return data.rows[0]
    })
}


module.exports = {selectTopics, selectEndpoint, selectArticleID}