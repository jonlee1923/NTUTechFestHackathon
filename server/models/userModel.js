const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        desc: {
            type: String,
        },
        age: {
            type: String,
        },
        github: {
            type: String,
        },
        portfolio: {
            type: String,
        },

        dp: {
            type: String,
        },
        skills: {
            type: String,
        },

        education: [
            { type: mongoose.Types.ObjectId, required: true, ref: "Education" },
        ],
        experience: [
            {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Experience",
            },
        ],
        jobs: [{ type: mongoose.Types.ObjectId, required: true, ref: "Job" }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
