const mongoose = require('mongoose');

// Request Schema
const requestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestData: { type: mongoose.Schema.Types.Mixed, required: true }, // Store any request-specific data
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'completed', 'failed'], 
        default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Export Request model
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
