const { selectTopics, selectArticleID, selectEndpoint } = require("../models/models");


exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
        next(err)
    })
};

exports.getEndpoints = (req, res, next) => {
    selectEndpoint()
    .then((data) => {
        res.status(200).send({data});
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticleID = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleID(article_id)
    .then ((data) => {
        res.status(200).send({data});
    })
    .catch((err) => {
        next(err)
    })
}

