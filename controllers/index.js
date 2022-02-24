const { fetchUserId } = require("../models");

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
