const express = require('express');
const router = express.Router();
const { signUp, signIn, getWorker, updateWorker } = require("../controllers/workerController")

router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
router.route('/getWorker')
    .post(getWorker)
router.route('/updateWorker')
    .post(updateWorker)

module.exports = router;