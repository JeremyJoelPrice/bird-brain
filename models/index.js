const database = require("../database/connection")

exports.sampleModel = () => {
    return database.query("SELECT * FROM users;").then((response) => {
        return response;
    });
}