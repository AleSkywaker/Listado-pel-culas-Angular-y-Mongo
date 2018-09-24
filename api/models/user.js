'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    description: String,
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        select: false
    },
    image: String,
    role: String,
    created_at: Date
})

module.exports = mongoose.model('User', UserSchema);