const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    registerUser,
    loginUser,
    updateOne,
    getMe,
    updateGithub,
    updateSkills
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

router.patch("updateGithub/:uid", updateGithub);

module.exports = router;
