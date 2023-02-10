const express = require('express');
const router = express.Router();
const {addJob, getJobs} = require('../controllers/jobController')

router.route('/add').post(addJob)
router.route('/get').post(getJobs)

module.exports = router;