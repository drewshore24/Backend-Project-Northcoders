const { selectTopics } = require("../models/models");


exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
        console.log(err,'err')
        next(err)
    })
};



