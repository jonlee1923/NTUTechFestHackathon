const express = require("express");
const router = express.Router();
const {
    getJobs, getCompanyJobs, applyJob, createJob, deleteJob
} = require('../controllers/jobsController')
    getJobs,
    getCompanyJobs,
    applyJob,
    createJob,
    deleteJob,
} = require("../controllers/jobsController");
// const { protect } = require('../middleware/authMiddleware')

router.get('/', getJobs)
router.get('/getJobs/:companyId', getCompanyJobs)
router.post('/:companyId', createJob)
router.patch('/apply/:uid', applyJob)
router.delete("/delete/:jobId", deleteJob);

module.exports = router;
