const models = require("../models");

const findGroups = (req, res) => {
  models.user_group
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// je récupère les groupes auxquels un utilisateur appartient en fonction de son id

const findGroupByUserId = (req, res) => {
  const { userId } = req.params;

  models.user_group
    .findByUserId(userId)
    .then((results) => {
      if (results[0]) res.send(results);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
// je récupère les utilisateurs qui appartiennent à un groupe en fonction de son id

const findUserByGroupId = (req, res) => {
  const { groupId, base } = req.params;

  models.user_group
    .findByGroupId(groupId, base)
    .then((results) => {
      if (results[0]) res.send(results);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const addUserInGroup = (req, res) => {
  const { userId, groupId } = req.body;

  models.user_group
    .insert(userId, groupId)
    .then(() => {
      res.status(201).send(`User added in group: ${groupId}`);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
// J'insère un utilisateur dans plusieurs groupes
const addUserInSeveralGroup = (req, res) => {
  const { userId, groupIds } = req.body;

  models.user_group
    .insertSeveralGroup(userId, groupIds)
    .then(() => {
      res.status(201).send(`User added in group: ${groupIds}`);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
// Je supprime un utilisateur de tous les groupes

const deleteByUserId = (req, res) => {
  const { userId } = req.params;

  models.user_group
    .deleteByUserId(userId)
    .then(() => {
      res.status(201).send("User deleted");
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
// Je supprime un groupe auquel un utilisateur appartient

const deleteByGroupId = (req, res) => {
  const { groupId, userId } = req.params;

  models.user_group
    .deleteByGroupId(groupId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  findGroups,
  findGroupByUserId,
  findUserByGroupId,
  addUserInGroup,
  addUserInSeveralGroup,
  deleteByUserId,
  deleteByGroupId,
};
