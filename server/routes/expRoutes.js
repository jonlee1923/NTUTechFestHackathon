const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");

const {
    createExperience,
    getExp,
    updateExp,
} = require("../controllers/expController");
router.get("/getExp/:uid", getExp);
router.post("/createExp/:uid", createExperience);
router.post("/updateExp/:expId", updateExp);

module.exports = router;
