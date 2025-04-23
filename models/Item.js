const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    id: String,
    date: { type: Date, default: Date.now },
    highestBidder: String
});
module.exports = mongoose.model('Item', itemSchema);