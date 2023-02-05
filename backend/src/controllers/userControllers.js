const models = require("../models");

const browse = (req, res) => {
  models.user_detail
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseInBackend = (req, res) => {
  const query = `%${req.params.query}%`;

  models.user_detail
    .noFetchAll(query)
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

  models.user_detail
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
  const user = req.body;

  models.user_detail
    .insert(user)
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;
  user.id = req.params.id;

  models.user_detail
    .update(user)
    .then((result) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const editUserAvatar = (req, res) => {
  const user = {};
  user.id = req.params.userid;
  user.avatar = req.renamedFile;

  models.user_detail
    .updateUserAvatar(user)
    .then((result) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.json({ avatar: user.avatar });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.user_detail
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
  read,
  add,
  edit,
  editUserAvatar,
  destroy,
  browseInBackend,
};
