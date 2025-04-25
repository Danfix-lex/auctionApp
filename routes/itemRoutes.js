const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticate = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
const upload = multer({ storage });

router.post('/create', authenticate, upload.single('image'), itemController.createItem);
router.post('/update', itemController.updateItem);
router.post('/bid', authenticate, itemController.bidOnItem);

module.exports = router;
