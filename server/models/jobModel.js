const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    companyName: {
        type: String,
    },
    starRating: {
        type: String,
    },
    offeredRole: {
        type: String,
    },
    location: {
        type: String,
    },
    jobDesc: {
        type: String,
    },
    url: {
        type: String,
    },
    applicants: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "Company" },
});

module.exports = mongoose.model("Job", jobSchema);
