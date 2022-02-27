const express = require("express");
const path = require("path");
const {
	loginController,
	getCardsByUserIdController,
	getPhotoController,
	sampleController,
	sendPhotoController,
	signupController
} = require("../controllers");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors
} = require("./errorHandlers");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(express.json());

app.get("/", sampleController);

app.get("/login", loginController);
app.post("/login", signupController);

app.get("/users/:user_id/cards", getCardsByUserIdController);

app.post("/photo", upload.single("photo"), sendPhotoController);
app.get("/photo/:bird/:imageNum", getPhotoController);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
