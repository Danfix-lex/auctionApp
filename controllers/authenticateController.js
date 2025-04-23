const { validationResult } = require('express-validator');
const authenticateService = require('../services/authenticateService');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const result = await authenticateService.registerUser(req.body);
    res.status(result.status).json(result.data);
};

exports.registerAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const result = await authenticateService.registerAdmin(req.body);
    res.status(result.status).json(result.data);
};

exports.loginUser = async (req, res) => {
    const result = await authService.loginUser(req.body);
    res.status(result.status).json(result.data);
};