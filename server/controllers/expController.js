const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Experience = require("../models/experienceModel");
const mongoose = require("mongoose");

const getExp = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    const experiences = await Experience.find({ creator: userId });
    console.log("fetching exp");
    console.log(experiences)
    res.status(200).json({
        experiences: experiences.map((experience) =>
            experience.toObject({ getters: true })
        ),
    });
});

const createExperience = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    console.log(req.body);
    const { name, position, datestart, dateend, country, description } =
        req.body;
    createdExp = new Experience({
        name,
        position,
        datestart,
        dateend,
        country,
        description,
        creator: userId,
    });
    console.log(userId);
    const user = await User.findOne({ userId });
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdExp.save({ session: sess });
        user.experience.push(createdExp);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        res.status(500);
        console.log(err);
        throw new Error(err.message);
    }
});

module.exports = {
    createExperience,
    getExp
};