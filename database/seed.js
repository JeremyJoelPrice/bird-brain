const format = require("pg-format");
const { user } = require("pg/lib/defaults");
const database = require("./connection");

module.exports = async ({ users }) => {
	await dropTables();
	await createTables();
	await insertUserData(users);
};

function dropTables() {
	return database.query("DROP TABLE IF EXISTS users");
}

function createTables() {
	return database.query(`
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        nickname VARCHAR
      );`);
}

function insertUserData(users) {
	const sql = format(
		`
	INSERT INTO users (email, password, nickname)
	VALUES %L
	;`,
		users.map(({ email, password, nickname }) => [email, password, nickname])
	);

	return database.query(sql);
}
