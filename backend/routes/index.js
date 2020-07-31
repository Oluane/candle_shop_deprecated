const express = require("express");
const app = express();
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const scentsFamilies = require("./scentsFamilies");

router.use("/auth", auth);
router.use("/user", user);
router.use("/scents_families", scentsFamilies);

router.get("/", (req, res) => {
	const msg = "Hello World";
	res.status(200).send(msg);
});

module.exports = router;
