exports.sampleController = (req, res, next) => {
	res.status(200).send(require("../server/greeting.json"));
};
