const express = require('express')
const router = express.Router()
const {
    getJobs
} = require('../controllers/jobsController')
// const { protect } = require('../middleware/authMiddleware')

router.get('/', getJobs)


module.exports = router
