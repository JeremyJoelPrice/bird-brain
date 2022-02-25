const seed = require("./seed.js");
const database = require("./connection");

const ENV = process.env.NODE_ENV || "test";

const data = require(`../database/${ENV} data`);
console.log(ENV, "<<<env");

const runSeed = () => {
	return seed(data).then(() => database.end());
};

runSeed();
