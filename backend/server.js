const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const {
	CONFIG: { backendPort },
} = require("./conf");

/*-------------------------------------------------- Tools */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

/*-------------------------------------------------- Public Routes */

app.get("/", (req, res) => {
	const msg = "Hello World";
	//console.log(msg);
	res.status(200).send(msg);
});

/*-------------------------------------------------- Server launch */

app.listen(backendPort, (err) => {
	if (err) {
		throw new Error("Something bad happened...");
	}

	console.log(`Server is listening on ${backendPort}`);
});
