'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
    userSeguidor: { type: Schema.ObjectId, ref: 'User' },
    userSeguido: { type: Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Follow', FollowSchema);