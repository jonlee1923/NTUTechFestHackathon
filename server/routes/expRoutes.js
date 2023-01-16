
const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");

const { createExperience } = require("../controllers/expController");

router.post(
    "/createExp/:uid",
    createExperience
)

module.exports = router;
