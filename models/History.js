const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ip: String,
    city: String,
    country: String,
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema);
