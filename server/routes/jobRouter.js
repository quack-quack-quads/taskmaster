const express = require('express');
const router = express.Router();
const {addJob, getJobs, getJobsByCategory} = require('../controllers/jobController')

router.route('/add').post(addJob)
router.route('/get').post(getJobs)
router.route("/getByCategory").post(getJobsByCategory)

module.exports = router;