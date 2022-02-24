const format = require("pg-format");
const database = require("./connection");

module.exports = async ({ fact_cards, users, users_fact_cards }) => {
	await dropTables();
	await createTables();
	await insertUserData(users);
	await insertFactCardData(fact_cards);
	await insertUserFactCardData(users_fact_cards);
};

async function dropTables() {
	await database.query("DROP TABLE IF EXISTS users_fact_cards;");
	await database.query("DROP TABLE IF EXISTS users;");
	await database.query("DROP TABLE IF EXISTS fact_cards;");
}

async function createTables() {
	await database.query(`
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        nickname VARCHAR
    );`);

	await database.query(`
    CREATE TABLE fact_cards (
        card_id SERIAL PRIMARY KEY,
        fact VARCHAR UNIQUE NOT NULL,
		image_url VARCHAR UNIQUE NOT NULL,
		bird_name VARCHAR NOT NULL
    );`);

	await database.query(`
	CREATE TABLE users_fact_cards (
    id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id),
	card_id INTEGER REFERENCES fact_cards(card_id)
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

function insertFactCardData(fact_cards) {
	const sql = format(
		`
	INSERT INTO fact_cards (fact, image_url, bird_name)
	VALUES %L
	;`,
		fact_cards.map(({ fact, image_url, bird_name }) => [
			fact,
			image_url,
			bird_name
		])
	);

	return database.query(sql);
}

function insertUserFactCardData(users_fact_cards) {
	const sql = format(
		`
	INSERT INTO users_fact_cards (user_id, card_id)
	VALUES %L
	;`,
		users_fact_cards.map(({ user_id, card_id }) => [user_id, card_id])
	);
	return database.query(sql);
}
