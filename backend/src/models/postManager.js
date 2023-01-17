const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  find(id) {
    return this.connection.any(
      `select id, title, content, user_id, category_id from  ${this.table} where id = $1`,
      [id]
    );
  }

  findAll(base) {
    return this.connection.any(
      `select id, title, content, user_id, category_id from  ${this.table} limit 10 offset $1`,
      [base]
    );
  }

  insert(post) {
    return this.connection.any(
      `INSERT INTO ${this.table} (title, content, user_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *;
      `,
      [post.title, post.content, post.user_id, post.category_id]
    );
  }

  update(post) {
    return this.connection.any(
      `update ${this.table} set title = $1, content = $2, user_id = $3, category_id = $4 where id = $4`,
      [post.title, post.content, post.user_id, post.category_id]
    );
  }
}

module.exports = PostManager;
