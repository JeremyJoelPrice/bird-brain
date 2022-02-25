const fileSystem = require("fs");
const { createUser, fetchCards, fetchUserId } = require("../models");

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

exports.getCardsController = (req, res, next) => {
	fetchCards(req.params.user_id)
		.then(({ rows }) => {
			res.status(200).send({ cards: rows });
		})
		.catch(next);
};

exports.sendPhotoController = (req, res, next) => {
	throw { status: 404, msg: "Kate Moss not found" };
};
