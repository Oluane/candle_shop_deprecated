require("dotenv").config();
const mysql = require("mysql");

let CONFIG = {
	backendPort: process.env.BACKEND_PORT || "4200",
};

const db = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "anotherUser",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "database",
});

module.exports = { CONFIG, db };
