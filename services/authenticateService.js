const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Register = require('../models/Register');
const Admin = require('../models/Admin');
const Login = require('../models/Login');

exports.registerUser = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new Register({ name: data.name, email: data.email, password: hashedPassword });
        await user.save();
        return { status: 200, data: { success: true, message: 'Register successfully' } };
    } catch (error) {
        return { status: 400, data: { errors: 'Registration failed' } };
    }
};

exports.registerAdmin = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const admin = new Admin({ name: data.name, email: data.email, password: hashedPassword });
        await admin.save();
        return { status: 200, data: { success: true, message: 'Admin registered successfully' } };
    } catch (error) {
        return { status: 400, data: { errors: 'Admin registration failed' } };
    }
};

exports.loginUser = async (data) => {
    try {
        const user = await Register.findOne({ email: data.email });
        if (!user) return { status: 400, data: { errors: 'User not found' } };

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) return { status: 400, data: { errors: 'Wrong password' } };

        const token = jwt.sign({ userId: user._id }, 'auction-app-secret', { expiresIn: '1h' });
        const login = new Login({email: data.email, password: data.password, token: token});
        await login.save();
        return { status: 200, data: { success: true, userId: user._id, token } };
    } catch (error) {
        return { status: 500, data: { errors: 'Login failed' } };
    }
};