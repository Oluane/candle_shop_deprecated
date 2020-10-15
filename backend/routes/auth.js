const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("../passport-strategies");
const crypto = require("crypto");
const router = express.Router();
const {
	CONFIG: { jwtSecret, saltRounds, accessTokenExpiresIn },
	db,
} = require("../conf");

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

						const xsrfToken = crypto.randomBytes(64).toString("hex");

						const accessToken = jwt.sign(
							{
								mailAddress: formData.mail_address,
								xsrfToken,
							},
							jwtSecret,
							{
								expiresIn: accessTokenExpiresIn / 1000,
								subject: results.insertId.toString(),
								issuer: "candleshop.com",
							}
						);

						res.cookie("access_token", accessToken, {
							httpOnly: true,
							sameSite: true,
							maxAge: accessTokenExpiresIn,
						});
						return res.status(201).send({
							xsrfToken: xsrfToken,
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
		req.login(user, { session: false }, loginErr => {
			if (loginErr) {
				return res.status(500).json({
					message: "Couldn't log you in, try again later !",
					user,
					loginErr,
				});
			}
			console.log(user);
			user.password = undefined;
			const xsrfToken = crypto.randomBytes(64).toString("hex");

			const accessToken = jwt.sign(
				{
					mailAddress: user.mail_address,
					xsrfToken,
				},
				jwtSecret,
				{
					expiresIn: accessTokenExpiresIn / 1000,
					subject: user.id.toString(),
					issuer: "candleshop.com",
				}
			);

			res.cookie("access_token", accessToken, {
				httpOnly: true,
				sameSite: true,
				maxAge: accessTokenExpiresIn,
			});

			return res
				.status(200)
				.json({ accessTokenExpiresIn: accessTokenExpiresIn, xsrfToken, userId: user.id });
		});
	})(req, res);
});

module.exports = router;
