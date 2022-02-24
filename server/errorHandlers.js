exports.handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
	switch (err.code) {
		case "22P02":
			res.status(400).send({ msg: "Invalid input" });
			break;
		case "23505":
			res.status(409).send({ msg: "Email already registered" });
			break;
		default:
			next(err);
	}
};

exports.handleServerErrors = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "Internal Server Error" });
};
