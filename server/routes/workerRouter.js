const express = require('express');
const router = express.Router();
const { signUp, signIn, getWorker } = require("../controllers/workerController")

router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
router.route('/getWorker')
    .post(getWorker)

module.exports = router;