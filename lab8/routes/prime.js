const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  res.render("primeNumber", { pageTitle: "Prime Number Checker" });
});

module.exports = router;
