const express = require("express");
const router = express.Router();

const { db } = require("../conf");

//subroutes

router.get("/types", (req, res) => {
	db.query(`SELECT id, en_name, en_desc FROM type`, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		}

		if (results.length) {
			res.status(200).json(results);
		}
	});
});

router.get("/types/:typeId/details", (req, res) => {
	const { typeId } = req.params;

	db.query(
		`SELECT ts.id, ts.height_in_cm, ts.width_in_cm, ts.weight_in_gr, ts.duration_in_hours, 
        t.id type_id, t.en_name type_en_name, t.en_desc type_en_desc, s.id size_id, s.short_name, s.en_name size_en_name FROM type_size ts
        JOIN type t ON ts.type_id = t.id 
        JOIN size s ON ts.size_id = s.id
        WHERE ts.type_id = ? `,
		[typeId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}

			if (results.length) {
				res.status(200).json(results);
			}
		}
	);
});

module.exports = router;
