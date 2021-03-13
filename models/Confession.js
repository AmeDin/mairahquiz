const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConfessionSchema = new Schema({
    answer: {
        type: Boolean,
        default: true,
        required: true
    },
    details: {
        type: String,
        required: true
    },
});

module.exports = Confession = mongoose.model('confession', ConfessionSchema);