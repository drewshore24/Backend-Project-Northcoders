const { selectTopics, selectEndpoint } = require("../models/models");


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


