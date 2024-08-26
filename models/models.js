const db = require('../db/connection')
const format = require('pg-format')



selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((data) => {
        console.log(data, 'models')
        return data.rows
    })
}



module.exports = {selectTopics}