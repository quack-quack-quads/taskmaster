const express = require('express');
const router = express.Router();
const { createAdmin, getAdmin, signIn, getAllAdmins, approveWorker, getWorkers } = require("../controllers/adminController")

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
router.route("/approveWorker")
    .post(approveWorker)
router.route("/getWorkers")
    .post(getWorkers)

module.exports = router;