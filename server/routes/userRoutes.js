const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const {
    registerUser,
    loginUser,
    updateOne,
    getMe,
} = require("../controllers/userController");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.patch(
    "/updateOne/:uid",
    fileUpload.single("image"), //extracts file from the image key
    updateOne
);

module.exports = router;
