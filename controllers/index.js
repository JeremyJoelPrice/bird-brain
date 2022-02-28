const fileSystem = require("fs");
const { createUser, fetchCardsByUserId, fetchUserId } = require("../models");

exports.sampleController = (req, res, next) => {
	res.status(200).send(require("../server/greeting.json"));
};

exports.loginController = (req, res, next) => {
	const {email, password} = req.query;
	
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

exports.getCardsByUserIdController = (req, res, next) => {
	fetchCardsByUserId(req.params.user_id)
		.then(({ rows }) => {
			res.status(200).send({ cards: rows });
		})
		.catch(next);
};

exports.sendPhotoController = (req, res, next) => {
	throw { status: 404, msg: "Kate Moss not found" };
};

exports.getPhotoController = (req, res, next) => {
	res
		.status(200)
		.sendFile(
			`${req.params.bird}/${req.params.bird}-${req.params.imageNum}.jpg`,
			{ root: __dirname + "/../database/production data/images/" }
		);
};
