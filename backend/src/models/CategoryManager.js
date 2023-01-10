const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  find(id) {
    return this.connection.any(
      `select id, category_name, image, group_id from  ${this.table} where id = $1`,
      [id]
    );
  }

  findAll() {
    return this.connection.any(
      `select id, category_name, image, group_id from  ${this.table}`
    );
  }

  insert(category) {
    return this.connection.any(
      `INSERT INTO ${this.table} (category_name, image, group_id) VALUES ($1, $2, $3) RETURNING *;
      `,
      [category.category_name, category.image, category.group_id]
    );
  }

  update(category) {
    return this.connection.any(
      `update ${this.table} set category_name = $1, image = $2, group_id = $3 where id = $4`,
      [category.category_name, category.image, category.group_id]
    );
  }
}

module.exports = CategoryManager;
