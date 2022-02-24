const express = require("express");

const {
	loginController,
	getCardsController,
	sampleController,
	signupController
} = require("../controllers");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors
} = require("./errorHandlers");

const app = express();

app.use(express.json());

app.get("/", sampleController);

app.get("/login", loginController);
app.post("/login", signupController);

app.get("/users/:user_id/cards", getCardsController);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
