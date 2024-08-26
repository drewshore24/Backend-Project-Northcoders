const express = require('express')
const app = express()
const {getTopics, getEndpoints} = require('../controllers/controller')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }else{
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'Server Error'})
})


module.exports = app