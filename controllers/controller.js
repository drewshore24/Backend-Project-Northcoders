const {
  selectTopics,
  selectArticleID,
  selectEndpoint,
  selectArticles,
  selectCommentsByArtID,
  insertComment,
  updateArticle,
  selectCommentID,
  removeComment
} = require("../models/models");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (req, res, next) => {
  selectEndpoint()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleID(article_id)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArtID = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArtID(article_id)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  insertComment(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const addVote = req.body;
  updateArticle(article_id, addVote)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentID = (req, res, next) => {
    const { comment_id } = req.params;
    selectCommentID(comment_id)
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((err) => {
        next(err);
      });
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then((response) => {
    res.status(204).send();
  })
  .catch((err) => {
    next(err);
  });
};
