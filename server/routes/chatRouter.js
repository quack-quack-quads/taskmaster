const express = require('express');
const router = express.Router();
const {getChat, putMessage} = require('../controllers/chatController')

router.route('/get').post(getChat);
router.route('/add').post(putMessage);

module.exports = router;
