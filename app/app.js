const express = require('express')
const app = express()
const {getTopics, getEndpoints, getArticleID, getArticles, getCommentsByArtID, postComment, patchArticle, deleteComment, getCommentID, getUsers} = require('../controllers/controller')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleID)

app.get('/api/comments/:comment_id', getCommentID)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArtID)

app.post('/api/articles/:article_id/comments', postComment);

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

app.get('/api/users', getUsers)

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }else{
        next(err)
    }
})

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Bad Request'})
    }else{
        next(err)
    }
})

app.use((err, req, res, next) => {
    if(err.code === '23502'){
        res.status(400).send({msg: 'Bad Request'})
    }else{
        next(err)
    }
})


module.exports = app

