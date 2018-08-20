'use strict'

const express = require('express');
const PeliculaController = require('../controllers/pelicula');

// const md_auth = require('../middlewares/authenticated')

const api = express.Router();

api.post('/grabarpeli', PeliculaController.grabarPeli);


module.exports = api;