const database = require("./connection");

exports.dropTables = () => {
	return database.query("DROP TABLE IF EXISTS users");
};

exports.createTables = () => {
	return database.query(`
    CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR
      );`);
};
