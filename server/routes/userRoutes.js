const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    registerUser,
    loginUser,
    updateDp,
    getMe,
} = require("../controllers/userController");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/profilepage/:uid",getMe);

router.patch(
    "/uploaddp/:uid",
    fileUpload.single("image"), //extracts file from the image key
    updateDp
);

module.exports = router;
