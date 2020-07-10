const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	const msg = "Hello World";
	//console.log(msg);
	res.status(200).send(msg);
});

module.exports = router;
