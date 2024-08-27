const express = require('express')
const app = express()
const {getTopics, getEndpoints, getArticleID} = require('../controllers/controller')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleID)


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
    res.status(500).send({msg: 'Server Error'})
})


module.exports = app

