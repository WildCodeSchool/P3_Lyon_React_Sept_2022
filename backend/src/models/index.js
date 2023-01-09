require("dotenv").config();
const promise = require("bluebird");
const fs = require("fs");
const path = require("path");

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require("pg-promise")(options);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const db = pgp(connectionString);

db.connect().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

const models = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "AbstractManager.js" && file !== "index.js")
  .reduce((acc, file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const Manager = require(path.join(__dirname, file));

    const managerInstance = new Manager();
    managerInstance.setConnection(db);

    return { ...acc, [managerInstance.table]: managerInstance };
  }, {});

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
