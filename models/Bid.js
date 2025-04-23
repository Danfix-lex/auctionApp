const mongoose = require("mongoose");
const bidSchema = new mongoose.Schema({
    title: String,
    description: String,
    bidAmount: Number,
    bidderId: String,
    itemId: String,
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Bid', bidSchema);