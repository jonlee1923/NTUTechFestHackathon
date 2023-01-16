const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Company = require("../models/companyModel");
// const Education  = require("../models/educationModel");
const mongoose = require("mongoose");

const registerCompany = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await Company.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const company = await Company.create({
        name,
        email,
        password: hashedPassword,
    });

    if (company) {
        res.status(201).json({
            _id: company.id,
            name: company.name,
            email: company.email,
            token: generateToken(company._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginCompany = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const company = await Company.findOne({ email });

    if (company && (await bcrypt.compare(password, company.password))) {
        res.json({
            _id: company.id,
            name: company.name,
            email: company.email,
            token: generateToken(company._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

const getCompany = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    const company = await Company.findOne({ userId });
    res.status(200).json(company);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerCompany,
    loginCompany,
    getCompany,
};
