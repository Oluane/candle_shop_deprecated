const express = require("express");
const router = express.Router({ mergeParams: true });

const { db } = require("../conf");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, (req, res) => {
	const userId = req.params.userId;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(
		`SELECT ca.id, ca.name, ca.address, ca.address_complement, ca.zip_code, ca.city, ca.is_favorite FROM customer_address ca WHERE ca.customer_id = ?;`,
		[userId],
		(err, results) => {
			if (err) {
				console.log("here " + err);
				return res.status(500).json({ message: "Internal Error" });
			} else {
				res.status(200).json(results);
			}
		}
	);
});

module.exports = router;
