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
});

module.exports = mongoose.model("Job", jobSchema);
