const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user_detail" });
  }

  find(id) {
    return this.connection.any(
      `select id, firstname, lastname, email from  ${this.table} where id = $1`,
      [id]
    );
  }

  findByEmailWithPassword(email) {
    return this.connection.one(
      `select * from  ${this.table} where email = $1`,
      [email]
    );
  }

  findAll() {
    return this.connection.any(
      `select id, firstname, lastname, email, is_admin from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.any(
      `INSERT INTO ${this.table} (firstname, lastname, email, is_admin, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.is_admin,
        user.hashedPassword,
      ]
    );
  }

  update(user) {
    return this.connection.any(
      `update ${this.table} set firstname = $1, lastname = $2, email = $3, is_admin = $4 where id = $4`,
      [user.firstname, user.lastname, user.email, user.id, user.is_admin]
    );
  }
}

module.exports = UserManager;
