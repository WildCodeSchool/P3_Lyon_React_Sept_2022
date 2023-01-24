const AbstractManager = require("./AbstractManager");

class UserGroupManager extends AbstractManager {
  constructor() {
    super({ table: "user_group" });
  }

  // je récupère les groupes auxquels un utilisateur appartient en fonction de son id.

  findByUserId(userId) {
    return this.connection.any(
      `SELECT group_id, group_detail.group_name FROM ${this.table} 
      JOIN group_detail ON group_detail.id = user_group.group_id
      WHERE user_id = $1`,
      [userId]
    );
  }

  // je récupère les utilisateurs qui appartiennent à un groupe en fonction de son id

  findByGroupId(groupId) {
    return this.connection.any(
      `SELECT ud.firstname, ud.lastname, ud.phone_number, ud.email, user_group.user_id FROM user_detail AS ud
      RIGHT JOIN ${this.table} ON ud.id = user_group.user_id
      WHERE group_id = $1`,
      [groupId]
    );
  }

  findAll() {
    return this.connection.any(`SELECT * FROM ${this.table}`);
  }
  // J'insère un utilisateur dans un groupe

  insert(userId, groupId) {
    return this.connection.any(
      `INSERT INTO ${this.table} (user_id, group_id) VALUES ($1, $2) RETURNING *;`,
      [userId, groupId]
    );
  }

  // J'insère un utilisateur dans plusieurs groupes

  insertSeveralGroup(userId, groupIds) {
    return this.connection.any(
      `INSERT INTO ${this.table} (user_id, group_id)
      SELECT $1, unnest(ARRAY[$2])
      RETURNING id;`,
      [userId, groupIds]
    );
  }

  // Je supprime un utilisater de tous les groupes

  deleteByUserId(userId) {
    return this.connection.any(`DELETE FROM ${this.table} WHERE user_id = $1`, [
      userId,
    ]);
  }

  // Je supprime un groupe auquel un utilisateur appartient

  deleteByGroupId(groupId, userId) {
    return this.connection.any(
      `DELETE FROM ${this.table} WHERE group_id = $1 AND user_id = $2`,
      [groupId, userId]
    );
  }
}
module.exports = UserGroupManager;
