const { createUser, fetchUserId } = require("../models");

exports.sampleController = (req, res, next) => {
	res.status(200).send(require("../server/greeting.json"));
};

exports.loginController = (req, res, next) => {
	const { email, password } = req.body;
	fetchUserId(email, password)
		.then((user_id) => {
			res.send({ user_id });
		})
		.catch(next);
};

exports.signupController = (req, res, next) => {
	const { email, password, nickname } = req.body;
	createUser(email, password, nickname)
		.then(() => {
			res.send(201);
		})
		.catch(next);
};
