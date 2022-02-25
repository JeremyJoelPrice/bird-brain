const seed = require("./seed.js");
const database = require("./connection");

const data = require(`../database/${process.env.NODE_ENV || "test"} data`);

const runSeed = () => {
	return seed(data).then(() => database.end());
};

runSeed();
