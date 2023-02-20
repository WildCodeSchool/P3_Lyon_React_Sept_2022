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

const browseUserGroup = (req, res) => {
  const { id, base } = req.params;
  models.post
    .findAllByUserGroup(id, base)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseMyPosts = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const base = parseInt(req.params.base, 10);
  models.post
    .findMyPosts(id, base)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByGroup = (req, res) => {
  const base = parseInt(req.params.base, 10);
  const group = parseInt(req.params.group, 10);
  models.post
    .findPostsByGroup(group, base)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByCategory = (req, res) => {
  const base = parseInt(req.params.base, 10);
  const category = parseInt(req.params.category, 10);
  models.post
    .findPostsByCategory(category, base)
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
  const post = JSON.parse(req.body.post);
  post.post_image = req.renamedFile;
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
  browseUserGroup,
  browseMyPosts,
  browseByGroup,
  browseByCategory,
  read,
  add,
  edit,
  destroy,
};
