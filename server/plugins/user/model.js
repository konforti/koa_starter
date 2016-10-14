const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    phone: {type: String, required: true, unique: true},
    firstName: String,
    lastName: String,
    email: String,
    picture: String,
    roles: [String],
}, {timestamps: true});

schema.statics.permit = ['firstName', 'lastName', 'email'];

module.exports = mongoose.model('User', schema);
