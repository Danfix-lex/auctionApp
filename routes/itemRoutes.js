const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticate = require('../middlewares/authenticate');

router.post('/create', itemController.createItem);
router.post('/update', itemController.updateItem);
router.post('/bid', authenticate, itemController.bidOnItem);

module.exports = router;