const express = require('express');
const router = express.Router();
const { signUp, signIn, getClient } = require("../controllers/authController")

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/getclient').post(getClient)

module.exports = router;

router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
module.exports = router;