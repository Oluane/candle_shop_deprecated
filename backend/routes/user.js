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
		"SELECT id, first_name as firstName, last_name as lastName, mail_address as mailAddress, address, address_complement as addressComplement, city, zip_code as zipCode, phone_number as phoneNumber, cgu_checked as cguChecked, newsletter_checked as newsletterChecked FROM customer WHERE id = ?",
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

module.exports = router;
