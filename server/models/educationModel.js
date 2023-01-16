const mongoose = require("mongoose");

const eduSchema = mongoose.Schema({
    name: {
        type: String,
    },
    course: {
        type: String,
    },
    datestart: {
        type: String,
    },
    dateend: {
        type: String,
    },
    grade: {
        type: String,
    },
    maxgrade: {
        type: String,
    },
    description:{
        type: String
    },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Education", eduSchema);
