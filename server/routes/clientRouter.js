const express = require('express');
const router = express.Router();
const { signUp, signIn, getClient, updateClient } = require("../controllers/clientController")

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/getclient').post(getClient)
router.route('/updateclient').post(updateClient)

module.exports = router;