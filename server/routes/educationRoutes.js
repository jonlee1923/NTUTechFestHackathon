const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    getEducation,
    createEducation,
    updateEducation,
} = require("../controllers/educationController");

router.get("/:uid", getEducation);
router.post("/createEducation/:uid", createEducation);
router.post("/updateEducation/:eid", updateEducation); 

module.exports = router;
