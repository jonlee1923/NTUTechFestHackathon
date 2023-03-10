const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    registerUser,
    loginUser,
    updateOne,
    getMe,
    updateGithub,
    updateSkills,
    updatePortfolio
} = require("../controllers/userController");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/profilepage/:uid", getMe);

router.patch(
    "/updateOne/:uid",
    fileUpload.single("image"), //extracts file from the image key
    updateOne
);

router.patch("/updateSkills/:uid", updateSkills)

router.post("updateGithub/:uid", updateGithub);

router.patch("updatePortfolio/:uid", updatePortfolio);

module.exports = router;
