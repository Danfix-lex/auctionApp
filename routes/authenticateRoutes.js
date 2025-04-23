const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateController = require('../controllers/authenticateController');

router.post('/admin/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], authenticateController.registerAdmin);

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], authenticateController.registerUser);

router.post('/login', authenticateController.loginUser);

module.exports = router;