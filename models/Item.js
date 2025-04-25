const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    id: String,
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        required: true
    },
    date: { type: Date, default: Date.now },
    highestBidder: String
});
module.exports = mongoose.model('Item', itemSchema);