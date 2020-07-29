const express = require("express");
const router = express.Router();

const { db } = require("../conf");

router.get("/categories", (req, res) => {
	db.query("SELECT id, en_name, image_path FROM scents_category", (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		}

		if (results.length) {
			res.status(200).json(results);
		}
	});
});

module.exports = router;
