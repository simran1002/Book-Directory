const express = require("express");
const router = express.Router();

const Auth_route = require("./Auth");
const Book_route = require("./book");

router.use("/api/v1/auth", Auth_route);
router.use("/api/v1/store", Book_route);

module.exports = router;
