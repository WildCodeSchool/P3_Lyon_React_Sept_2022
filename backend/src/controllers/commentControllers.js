const models = require("../models");

const browse = (req, res) => {
  const { id } = req.params;
  models.comment
    .findAllByPost(id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseCommentsAmount = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.comment
    .findAmountByPost(id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const comment = req.body;

  models.comment
    .insert(comment)
    .then((result) => {
      res
        .location(`/api/posts/${result.post_id}/comments/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.comment
    .delete(id)
    .then((result) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseCommentsAmount,
  add,
  destroy,
};
