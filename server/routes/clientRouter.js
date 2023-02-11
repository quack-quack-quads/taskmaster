const express = require('express');
const router = express.Router();
const { signUp, signIn, getClient } = require("../controllers/clientController")

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/getclient').post(getClient)

module.exports = router;