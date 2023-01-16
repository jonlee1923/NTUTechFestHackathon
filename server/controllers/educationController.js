const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Education = require("../models/educationModel");
const mongoose = require("mongoose");

const getEducation = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    const user = await User.findOne({ userId });


    res.status(200).json({
        educations: user.education.map((education) =>
            education.toObject({ getters: true })
        ),
    });
});

const createEducation = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    console.log(req.body);
    const { name, course, datestart, dateend, grade, maxGrade, description } =
        req.body;
    createdEdu = new Education({
        name,
        course,
        datestart,
        dateend,
        grade,
        maxGrade,
        description,
    });
    const user = await User.findOne({ userId });
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdEdu.save({ session: sess });
        user.education.push(createdEdu);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        res.status(500);
        console.log(err);
        throw new Error(err.message);
    }
});

module.exports = {
    createEducation,
    getEducation,
};
