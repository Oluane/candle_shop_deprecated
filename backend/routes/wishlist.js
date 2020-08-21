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
		`SELECT w.id wishlist_id, w.customer_id, w.creation_datetime  FROM wishlist w 
    WHERE w.customer_id = ?`,
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

router.get("/:wishlistId", isAuthenticated, (req, res) => {
	const wishlistId = req.params.wishlistId;

	if (!wishlistId) {
		return res.status(401).json({ message: "OOPS! Missing wishlistId" });
	}

	db.query(
		`SELECT c.id candle_id, ts.type_id, ts.weight_in_gr, ts.duration_in_hours, ts.price, sc.en_name scents_en_name,
	     sc.is_essential_oil, t.en_name type_en_name, s.en_name size_en_name FROM candle c
	    JOIN type_size ts ON c.type_size_id = ts.id
	    JOIN scents sc ON c.scents_id = sc.id
	    JOIN type t on t.id = ts.type_id
	    JOIN size s ON s.id = ts.size_id
	    WHERE c.id IN (SELECT wi.candle_id FROM wishlist_items wi WHERE wi.wishlist_id = ?)`,
		[wishlistId],
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

router.delete("/:wishlistId/candle/:candleId", isAuthenticated, (req, res) => {
	const wishlistId = req.params.wishlistId;
	const candleId = req.params.candleId;

	if (!wishlistId) {
		return res.status(401).json({ message: "OOPS! Missing wishlistId" });
	}
	if (!candleId) {
		return res.status(401).json({ message: "OOPS! Missing candleId" });
	}

	db.query(
		`DELETE FROM wishlist_items WHERE wishlist_id = ? AND candle_id = ?`,
		[wishlistId, candleId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}
			res.status(200).send();
		}
	);
});

module.exports = router;
