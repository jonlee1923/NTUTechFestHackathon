
const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    getEducation,
    createEducation,

} = require("../controllers/educationController");

router.get("/:uid", getEducation);
router.post(
    "/createEducation/:uid",
    createEducation
)

module.exports = router;
