const express = require("express");
const app = express();
const router = express.Router();
const auth = require("./auth");

router.use("/auth", auth);

router.get("/", (req, res) => {
	const msg = "Hello World";
	//console.log(msg);
	res.status(200).send(msg);
});

module.exports = router;
