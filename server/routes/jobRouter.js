const express = require('express');
const router = express.Router();
const {addJob, getJobs, getJobsByCategory, getJobsByDistance, getAllJobs, acceptWorkerJob, getJobsWorker} = require('../controllers/jobController')

router.route('/add').post(addJob)
router.route('/get').post(getJobs)
router.route("/getByCategory").post(getJobsByCategory)
router.route("/getByDistance").post(getJobsByDistance)
router.route("/getAll").get(getAllJobs)
router.route("/acceptWorkerJob").post(acceptWorkerJob)
router.route("/getJobsWorker").post(getJobsWorker)

module.exports = router;