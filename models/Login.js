const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String,
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Login', loginSchema);