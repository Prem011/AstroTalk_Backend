const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.plugin(plm); 

const User = mongoose.model('User', userSchema);
module.exports = User;
