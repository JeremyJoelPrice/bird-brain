const database = require("./connection");
const data = require("./data/test-data");
const { dropTables, createTables } = require("./utils");

module.exports = async (data) => {
	await dropTables();
	await createTables();
};
