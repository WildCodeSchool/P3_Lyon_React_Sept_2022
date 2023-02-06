const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  find(id) {
    return this.connection.any(
      `select p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname, p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name, g.id as group_id, c.id as category_id
      FROM ${this.table} as p
       LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
       LEFT JOIN group_detail as g
      ON g.id = c.group_id where p.id = $1`,
      [id]
    );
  }

  findAll(base) {
    return this.connection.any(
      `select p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname, p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name, count(comment.id) as nbComments
      FROM ${this.table} as p
      LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
      LEFT JOIN group_detail as g
      ON g.id = c.group_id 
      LEFT JOIN comment ON comment.post_id = p.id
      group by p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname,  p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name
      ORDER BY p.id DESC limit 5 offset $1;`,
      [base]
    );
  }

  findAllByUserGroup(id, base) {
    return this.connection.any(
      `SELECT 
      p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname, p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name, count(comment.id) as nbComments
      FROM post as p
      LEFT JOIN category as c ON p.category_id = c.id 
      LEFT JOIN group_detail as g ON c.group_id = g.id 
      LEFT JOIN user_detail as ud ON ud.id = p.user_id
      LEFT JOIN user_group as ug ON g.id = ug.group_id 
      LEFT JOIN comment ON comment.post_id = p.id
      WHERE ug.user_id = $1
      group by p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname,  p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name
      ORDER BY p.id DESC limit 5 offset $2;`,
      [id, base]
    );
  }

  findMyPosts(id, base) {
    return this.connection.any(
      `select p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname, p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name, count(comment.id) as nbComments
      FROM ${this.table} as p
      LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
      LEFT JOIN group_detail as g
      ON g.id = c.group_id 
      LEFT JOIN comment ON comment.post_id = p.id
      WHERE p.user_id = $1
      group by p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname,  p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name
      ORDER BY p.id DESC 
      limit 5 offset $2;`,
      [id, base]
    );
  }

  findPostsByGroup(group, base) {
    return this.connection.any(
      `select p.id, p.user_id, p.title, p.content, ud.firstname, p.post_image, p.post_date,  ud.lastname, ud.avatar, c.category_name, g.group_name, count(comment.id) as nbComments
      FROM ${this.table} as p
      LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
      LEFT JOIN group_detail as g
      ON g.id = c.group_id 
      LEFT JOIN comment ON comment.post_id = p.id
      WHERE g.id = $1 
      group by p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname,  p.post_image,  ud.lastname, ud.avatar, c.category_name, g.group_name
      ORDER BY p.id DESC 
      limit 5 offset $2;`,
      [group, base]
    );
  }

  findPostsByCategory(category, base) {
    return this.connection.any(
      `select p.id, p.user_id, p.title, p.content, ud.firstname, p.post_image, p.post_date,  ud.lastname, ud.avatar, c.category_name, g.group_name, count(comment.id) as nbComments
      FROM ${this.table} as p
      LEFT JOIN user_detail as ud
      ON ud.id= p.user_id
      LEFT JOIN category as c
      ON c.id = p.category_id
      LEFT JOIN group_detail as g
      ON g.id = c.group_id 
      LEFT JOIN comment ON comment.post_id = p.id
      WHERE c.id = $1 
      group by p.id, p.user_id, p.title, p.content, p.post_date, ud.firstname,  p.post_image, ud.lastname, ud.avatar, c.category_name, g.group_name
      ORDER BY p.id DESC 
      limit 5 offset $2;`,
      [category, base]
    );
  }

  insert(post) {
    return this.connection.any(
      `INSERT INTO ${this.table} (title, content, user_id, category_id, post_date, post_image) VALUES ($1, $2, $3, $4, LOCALTIMESTAMP, $5) RETURNING *;
      `,
      [
        post.title,
        post.content,
        post.user_id,
        post.category_id,
        post.post_image,
      ]
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
