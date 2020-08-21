const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const { db } = require("../conf");

router.get("/", isAuthenticated, (req, res) => {
	const userId = req.user;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(
		`SELECT id, first_name , last_name , mail_address , 
        address, address_complement , city, zip_code , 
        DATE_FORMAT(birthdate, '%Y-%m-%d') as birthdate, phone_number, cgu_checked , 
        newsletter_checked, DATE_FORMAT(sign_up_datetime, '%Y-%m-%d') as signUpDate FROM customer WHERE id = ?`,
		[userId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}
			if (results.length) {
				return res.status(200).json(results);
			}
		}
	);
});

router.put("/", isAuthenticated, (req, res) => {
	const userId = req.user;
	const customerData = req.body;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(`UPDATE customer SET ? WHERE id = ?`, [customerData, userId], (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		} else {
			res.status(204).send();
		}
	});
});

router.use("/:userId/wishlist", require("./wishlist"));

module.exports = router;
