const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

// @desc    Get jobs data
// @route   GET /api/jobs
// @access  public
const getJobs = asyncHandler(async (req, res) => {
    try {
        let jobs = await Job.find();
        res.status(200).json({
            jobs: jobs.map((job) => job.toObject({ getters: true })),
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = {
    getJobs,
};
