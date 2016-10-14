const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    body: String,
    tags: Array,

}, {timestamps: true});

module.exports = mongoose.model('Post', schema);
