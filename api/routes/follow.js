'use strict'

const express = require('express');
const FollowController = require('../controllers/follow');
const api = express.Router();
const md_auth = require('../middlewares/authenticated')

api.post('/seguir-usuario', md_auth.ensureAuth, FollowController.seguirUsuario);
api.delete('/dejardeseguir/:id', md_auth.ensureAuth, FollowController.deleteFollow);
api.get('/siguiendo/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingUsers);
api.get('/siguido/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowedUsers);


module.exports = api;