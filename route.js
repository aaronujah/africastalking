const express = require("express");
const router = express.Router();
const ussdController = require("./ussd");

router.route("/ussd").post(ussdController);

module.exports = router;
