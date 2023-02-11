const express = require('express');
const router = express.Router();
const { createworker, getworker } = require("../controllers/workerController")

router.route('/createWorker')
    .post(createworker)
router.route('/getWorker')
    .post(getworker)

module.exports = router;