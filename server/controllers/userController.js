const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Education = require("../models/educationModel");
const mongoose = require("mongoose");
const { use } = require("../routes/userRoutes");

// const {
//     default: Education,
// } = require("../../client/src/components/Education/Education");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

const updateOne = asyncHandler(async (req, res) => {
    const userId = req.params.uid;

    // Check for user email
    const user = await User.findOne({ userId });
    const { name, age, desc } = req.body;
    if (name) user.name = name;
    if (age) user.age = age;
    if (desc) user.desc = desc;

    if (typeof req.file !== "undefined") {
        user.dp = req.file.path;
    }

    try {
        await user.save();
        res.send(JSON.stringify("success"));
    } catch (err) {
        res.status(500);
        throw new Error(
            "Something went wrong, could not update please try again later."
        );
    }
});

const updateGithub = asyncHandler(async (req, res) => {
    const userId = req.params.uid;

    // Check for user email
    const user = await User.findOne({ userId });
    const { github } = req.body;
    user.github = github;

    try {
        await user.save();
        res.send(JSON.stringify("success"));
    } catch (err) {
        res.status(500);
        throw new Error(err.message);
    }
});

const updatePortfolio = asyncHandler(async (req, res) => {
  const userId = req.params.uid;

  // Check for user email
  const user = await User.findOne({ userId });
  const { portfolio } = req.body;
  user.portfolio = portfolio;

  try {
      await user.save();
      res.send(JSON.stringify("success"));
  } catch (err) {
      res.status(500);
      throw new Error(err.message);
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    const user = await User.findOne({ userId });
    res.status(200).json(user);
});

const updateSkills = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await User.findOne({ _id: userId });
        user.skills = skills;
        user.save();
        res.status(200).json(user);
    } catch (err) {
        throw new Error(err.message);
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateOne,
    updateGithub,
    updateSkills,
    updatePortfolio
};
