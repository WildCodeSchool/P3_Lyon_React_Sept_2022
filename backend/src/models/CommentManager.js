const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  findAllByPost(id) {
    return this.connection.any(
      `select c.id, c.content, ud.avatar, ud.id as userid
      FROM ${this.table} as c
      left join post as p
      ON p.id=c.post_id
      left join user_detail as ud
      ON ud.id=c.user_id WHERE post_id = $1;`,
      [id]
    );
  }

  insert(comment) {
    return this.connection.any(
      `INSERT INTO ${this.table} (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *;
      `,
      [comment.content, comment.post_id, comment.user_id]
    );
  }

  update(comment) {
    return this.connection.any(
      `update ${this.table} set content = $1, post_id = $2, user_id = $3 where id = $4`,
      [comment.content, comment.post_id, comment.user_id]
    );
  }
}

module.exports = CommentManager;
