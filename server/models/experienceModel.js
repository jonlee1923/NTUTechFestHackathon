const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: String,
    },
    datestart: {
        type: String,
    },
    dateend: {
        type: String,
    },
    country:{
        type: String,
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("Experience", expSchema);
