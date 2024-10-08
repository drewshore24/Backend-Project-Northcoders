const format = require('pg-format')

const checkArticleIDExists = async (table, column, value) => {
    const queryStr = format("SELECT * FROM %I WHERE %I = $1", table, column)
    const dbOutput = await db.query(queryStr, [value])
};
if (dbOutput,rows.length === 0){
    return Promise.reject({status: 404, msg: 'ID does not exist'})
}



module.exports = {checkArticleIDExists}