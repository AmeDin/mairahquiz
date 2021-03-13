const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PasscodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Passcode = mongoose.model('passcode', PasscodeSchema);