const models = require("../models");

const browse = (req, res) => {
  const base = parseInt(req.params.base, 10);
  models.post
    .findAll(base)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseMyPosts = (req, res) => {
  const base = parseInt(req.params.base, 10);
  models.post
    .findMyPosts(base)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.params;

  models.post
    .find(id)
    .then((results) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const post = req.body;

  models.post
    .insert(post)
    .then((result) => {
      res.location(`/api/posts/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const post = req.body;
  post.id = req.params.id;

  models.post
    .update(post)
    .then((result) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.post
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
  browseMyPosts,
  read,
  add,
  edit,
  destroy,
};
