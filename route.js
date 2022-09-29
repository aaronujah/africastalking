const express = require("express");
const router = express.Router();
const ussdController = require("./ussd");

router.route("/").post(ussdController.ussd);
// .get(ussdController.getMe);

module.exports = router;
