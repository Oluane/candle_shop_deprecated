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
		"SELECT id, first_name, last_name, mail_adress, address, address_complement, city, zip_code, phone_number, cgu_checked, newsletter_checked FROM customer WHERE id =?",
		[userId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			} else if (results.length) {
				console.log(results);
			}
		}
	);
});

module.exports = router;
