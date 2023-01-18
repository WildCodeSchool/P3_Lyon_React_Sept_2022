const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user_detail" });
  }

  find(id) {
    return this.connection.any(
      `select id, firstname, lastname, email, role, phone_number, is_admin from  ${this.table} where id = $1`,
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
    return this.connection.any(`select * from  ${this.table} ORDER BY id ASC`);
  }

  insert(user) {
    return this.connection.any(
      `INSERT INTO ${this.table} (firstname, lastname, email, role, phone_number, user_password, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.role,
        user.phone_number,
        user.hashedPassword,
        user.avatar,
      ]
    );
  }

  update(user) {
    return this.connection.any(
      `update ${this.table} set firstname = $1, lastname = $2, email = $3, is_admin = $4, phone_number = $5, role = $6 where id = $7`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.is_admin,
        user.phone_number,
        user.role,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;
