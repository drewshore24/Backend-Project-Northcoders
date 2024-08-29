const db = require('../db/connection')
const fs = require('fs/promises')
const format = require('pg-format')
const endpoint = require('../endpoints.json')
const { articleData } = require('../db/data/test-data')
// const {checkArticleIDExists} = require('../utils/utils')


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
              msg: 'article ID does not exist'
            })
        }
        return data.rows[0]
    })
}

const selectArticles = (sort_by, order) => {
  if(sort_by === undefined){
    sort_by = 'created_at'
  }
  if(order === undefined){
    order = 'DESC'
  }
  let queryStr = "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id"
  const queryValues = []
  const validColumns = [ 'author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'article_img_url'];
  if(!validColumns.includes(sort_by)){
    return Promise.reject({status: 400, msg: 'Bad Request'})
  }
  else{ queryStr += ` ORDER BY articles.${sort_by} ${order}`}
    return db
    .query(queryStr,queryValues)
    .then((data) => {
        return data.rows
    })
}

const selectCommentsByArtID = (article_id) => {
    return selectArticleID(article_id).then(() => {
    return db
    .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC", [article_id])
    .then((data) => {
        if(selectArticleID(article_id) !== 0){
            return data.rows
        }
        return data.rows
    })
})
}

const insertComment = (article_id, newComment) => {
    return selectArticleID(article_id).then(() => {
    const {username, body} = newComment
    return db
      .query(
        'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;',
        [article_id, username, body]
      )
      .then((result) => {
        return result.rows[0];
      });
    })
  };


const updateArticle = (article_id, votes) => {
    return selectArticleID(article_id).then(() => {
    const {inc_votes} = votes
    return db
      .query('UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *', [article_id, inc_votes]
      )
      .then((result) => {
        return result.rows[0]
      })
    })
}

//created selectCommentID to use in delete function below starting line 100 
const selectCommentID = (id) => {
    return db.query("SELECT * FROM comments WHERE comment_id = $1", [id])
    .then((data) => {
        if(data.rows.length === 0){
            return Promise.reject({
              status: 404,
              msg: 'comment ID does not exist'
            })
        }
        return data.rows[0]
    })
}

const removeComment = (comment_id) => {
    return selectCommentID(comment_id).then(() => {
        return db
          .query('DELETE FROM comments WHERE comment_id = $1', [comment_id]
          )
        })
}

const selectUsers = () => {
  return db
  .query("SELECT * FROM users")
  .then((data) => {
      return data.rows
  })
}
module.exports = {selectTopics, selectEndpoint, selectArticleID, selectArticles, selectCommentsByArtID, insertComment, updateArticle, removeComment, selectCommentID, selectUsers}
