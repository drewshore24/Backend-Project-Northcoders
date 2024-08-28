const { selectTopics, selectArticleID, selectEndpoint, selectArticles, selectCommentsByArtID, insertComment } = require("../models/models");


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

exports.getArticles = (req, res, next) => {
    selectArticles()
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((err) => {
          next(err)
      })
  };


  exports.getCommentsByArtID = (req, res, next) => {
    const {article_id} = req.params
    selectCommentsByArtID(article_id)
    .then((data) => {
        res.status(200).send({data})
    })
    .catch((err) => {
        next(err)
    })
  }


  exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    const newComment = req.body;
    insertComment(article_id, newComment).then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
  };