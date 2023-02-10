const express = require('express');
const router = express.Router();
const {putChat, getChatById} = require('../controllers/chatController')

router.route('/get').post(getChatById);
router.route('/add').put(putChat);

module.exports = router;
