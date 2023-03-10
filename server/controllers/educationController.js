const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Education = require("../models/educationModel");
const mongoose = require("mongoose");

// const getEducation = asyncHandler(async (req, res) => {
//   const userId = req.params.uid;
//   const user = await User.findOne({ userId });
//   const educations = await Promise.all(
//     user.education.map((id) => Education.findById(user.education))
//   );
//   res.status(200).json(educations);
// });

const getEducation = asyncHandler(async (req, res) => {
  const userId = req.params.uid;
  const educations = await Education.find({ creator: userId });
  console.log("fetching edu");

  res.status(200).json({
    educations: educations.map((education) =>
      education.toObject({ getters: true })
    ),
  });
});

const createEducation = asyncHandler(async (req, res) => {
  const userId = req.params.uid;
  console.log(req.body);
  const { name, course, datestart, dateend, grade, maxgrade, description } =
    req.body;
  createdEdu = new Education({
    name,
    course,
    datestart,
    dateend,
    grade,
    maxgrade,
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

const updateEducation = asyncHandler(async (req, res) => {
  const eduId = req.params.eid;

  const education = await Education.findOne({ _id: eduId });
  console.log(education, eduId)
  const { name, course, datestart, dateend, grade, maxgrade, description } = req.body;
  console.log(req.body);
  console.log(name)
  // console.log(education,eduId);
  education.name = name;
  education.course = course;
  education.datestart = datestart;
  education.dateend = dateend;
  education.grade = grade;
  education.maxgrade = maxgrade;
  education.description = description;
//   console.log(education,eduId);

  try {
    await education.save();
    res.send(JSON.stringify("success"));
  } catch (err) {
    res.status(500);
    throw new Error(
      err.message
    );
  }
});

module.exports = {
  createEducation,
  getEducation,
  updateEducation,
};
