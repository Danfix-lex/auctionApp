const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Register', registerSchema);