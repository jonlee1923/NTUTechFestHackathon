const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
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

const getCompanyJobs = asyncHandler(async (req, res) => {
    try {
        const companyId = req.params.companyId;
        let jobs = await Job.find({ creator: companyId });
        res.status(200).json({
            jobs: jobs.map((job) => job.toObject({ getters: true })),
        });
    } catch (err) {
        console.log(err);
    }
});

const getJob = asyncHandler(async (req, res) => {
    try {
        const jobId = req.params.jobId;
        let job = await Job.findOne({ jobId });
        // let jobs = await Job.findOne({});
        res.status(200).json(job);
    } catch (err) {
        console.log(err);
    }
});

const createJob = asyncHandler(async (req, res) => {
    const userId = req.params.companyId;
    console.log(req.body);
    const { companyName, offeredRole, location, jobDesc } = req.body;
    createdJob = new Job({
        companyName,
        offeredRole,
        location,
        jobDesc,
        creator: userId,
    });
    const company = await Company.findOne({ userId });
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdJob.save({ session: sess });
        company.jobs.push(createdJob);
        await company.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        res.status(500);
        console.log(err);
        throw new Error(err.message);
    }
});

const applyJob = asyncHandler(async (req, res) => {
    const userId = req.params.uid;
    console.log(req.body);
    const { jobId } = req.body;

    const job = await Job.findOne({ jobId });
    const user = await User.findONe({ userId });
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        job.applicants.push(user);
        await job.save({ session: sess });

        user.jobs.push(job);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        res.status(500);
        console.log(err);
        throw new Error(err.message);
    }
});

const deleteJob = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;

    let job;
    try {
        job = await Job.findById(jobId)
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete place.",
            500
        );
        return next(error);
    }

    if (!job) {
        const error = new HttpError(
            "Could not find a place  for that id.",
            404
        );
        return next(error);
    }

    try {
        const sess = await new mongoose.startSession();
        sess.startTransaction();
        await job.remove({ session: sess });
        sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete place.",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Deleted place." });
});

module.exports = {
    getJob,
    getJobs,
    createJob,
    applyJob,
    getCompanyJobs,
    deleteJob,
};
