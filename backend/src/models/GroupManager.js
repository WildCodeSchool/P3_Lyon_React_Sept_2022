const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "group_detail" });
  }

  find(id) {
    return this.connection.any(
      `select id, group_name, image from  ${this.table} where id = $1`,
      [id]
    );
  }

  findAll() {
    return this.connection.any(
      `select id, group_name, image from  ${this.table}`
    );
  }

  insert(groupDetail) {
    return this.connection.any(
      `INSERT INTO ${this.table} (group_name, image) VALUES ($1, $2) RETURNING *;
      `,
      [groupDetail.group_name, groupDetail.image]
    );
  }

  update(groupDetail) {
    return this.connection.any(
      `update ${this.table} set group_name = $1, image = $2 where id = $3`,
      [groupDetail.group_name, groupDetail.image]
    );
  }
}

module.exports = GroupManager;
