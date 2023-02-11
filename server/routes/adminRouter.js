const express = require('express');
const router = express.Router();
const { createAdmin, getAdmin, signIn, getAllAdmins } = require("../controllers/adminController")

const { ref, set, get, push, child} = require("firebase/database");
const { db, auth } = require("../firebase-config")

router.route('/signin')
    .post(signIn)
router.route('/createAdmin')
    .post(createAdmin)
router.route('/getAdmin')
    .post(getAdmin)
router.route("/getAdmins")
    .post(getAllAdmins)

module.exports = router;