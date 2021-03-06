const { user } = require("pg/lib/defaults");
const database = require("../database/connection");

exports.fetchUserId = async (email, password) => {
	const { rows } = await database.query(
		`
		SELECT * FROM users
		WHERE email=$1 AND password=$2
		`,
		[email, password]
	);
	if (rows[0]) return rows[0].user_id;
	throw { status: 404, msg: "Not Found" };
};

exports.createUser = (email, password, nickname) => {
	return database
		.query(
			`
		INSERT INTO users
		(email, password, nickname)
		VALUES ($1, $2, $3);
		`,
			[email, password, nickname]
		)
		.then(() => {
			return database.query(
				`
		SELECT user_id FROM users
		WHERE email=$1
		;`,
				[email]
			);
		});
};

exports.fetchCardsByUserId = (user_id) => {
	return database.query(
		`
		SELECT users_fact_cards.card_id, fact, bird_name, image_url, COUNT(id) AS count
		FROM users_fact_cards
		JOIN fact_cards ON users_fact_cards.card_id = fact_cards.card_id
		WHERE user_id = $1
		GROUP BY users_fact_cards.card_id, fact, bird_name, image_url
		;`,
		[user_id]
	);
};

exports.fetchFactCardsByBird = (bird_name) => {
	return database
		.query(
			`
		SELECT * FROM fact_cards
		WHERE bird_name = $1
		`,
			[bird_name]
		)
		.then((data) => data.rows);
};

exports.addOwnershipOfCardByUser = (user_id, card_id) => {
	return database.query(
		`
	INSERT INTO users_fact_cards
	(user_id, card_id)
	VALUES ($1, $2)
	;`,
		[user_id, card_id]
	);
};
