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
	return database.query(
		`
	INSERT INTO users
	(email, password, nickname)
	VALUES ($1, $2, $3);
	`,
		[email, password, nickname]
	);
};
