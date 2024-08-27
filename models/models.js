const db = require('../db/connection')
const fs = require('fs/promises')
const format = require('pg-format')
const endpoint = require('../endpoints.json')


const selectTopics = () => {
    return db
    .query("SELECT * FROM topics")
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

const selectArticles = () => {
    return db
    .query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC")
    .then((data) => {
        // console.log(data.rows)
        return data.rows
    })
}


module.exports = {selectTopics, selectEndpoint, selectArticleID, selectArticles}