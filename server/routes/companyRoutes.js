const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    registerCompany,
    loginCompany,
    getCompany,

} = require("../controllers/companyController");

router.post("/signup", registerCompany);

router.post("/login", loginCompany);

router.get("/profilepage/:uid",getCompany);


module.exports = router;
