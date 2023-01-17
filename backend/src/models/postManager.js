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

  findAll() {
    return this.connection.any(
      `select p.id, p.title, p.content, ud.firstname, ud.lastname, ud.avatar, c.category_name, g.group_name
      FROM ${this.table} as p
       LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
       LEFT JOIN group_detail as g
      ON g.id = c.group_id;`
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
