const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("../passport-strategies");
const router = express.Router();
const {
	CONFIG: { jwtSecret, saltRounds },
	db,
} = require("../conf");

router.get("/", (req, res) => {
	return res.status(200).send("ok pour auth");
});

router.post("/signup", (req, res) => {
	const formData = req.body;
	bcrypt.hash(req.body.password, parseInt(saltRounds), (err, hash) => {
		formData.password = hash;
		db.query(
			"SELECT mail_address FROM customer WHERE mail_address= ?",
			[formData.mail_address],
			(err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).send(err);
				} else if (!results.length) {
					db.query("INSERT INTO customer SET ?", [formData], (err, results) => {
						if (err) {
							console.error("Failure!" + err);
							return res.status(400).send("Invalid user creation request");
						}
						formData.password = undefined;
						return res.status(201).send({
							user: formData,
							token: jwt.sign(JSON.stringify(formData), jwtSecret),
						});
					});
				} else {
					return res.status(401).json({
						message: "An account already exists associated to that mail adress",
					});
				}
			}
		);
	});
});

router.post("/login", (req, res) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(401).json({
				message: "Failed auth",
				err,
				user,
				info,
			});
		}
		req.login(user, { session: false }, (loginErr) => {
			if (loginErr) {
				return res.status(500).json({
					message: "Couldn't log you in, try again later !",
					user,
					loginErr,
				});
			}
			user.password = undefined;
			const token = jwt.sign(user, jwtSecret);
			return res.status(200).json({ user, token });
		});
	})(req, res);
});

module.exports = router;
