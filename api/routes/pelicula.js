'use strict'

const express = require('express');
const PeliculaController = require('../controllers/pelicula');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/grabarpeli', md_auth.ensureAuth, PeliculaController.grabarPeli);
api.delete('/eliminarpeli/:id', PeliculaController.deleteMovie);
api.get('/pelis', md_auth.ensureAuth, PeliculaController.getMovies);
api.get('/pelicula/:id', PeliculaController.getMyMovie);


module.exports = api;