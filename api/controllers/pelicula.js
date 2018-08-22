'use strict'

const Pelicula = require('../models/pelicula');
const moment = require('moment')

function grabarPeli(req, res) {
    let params = req.body;

    let pelicula = new Pelicula();
    pelicula.actors = params.Actors;
    pelicula.awards = params.Awards;
    pelicula.country = params.Country;
    pelicula.fechaDvd = params.DVD;
    pelicula.director = params.Director;
    pelicula.genre = params.Genre;
    pelicula.language = params.Language;
    pelicula.plot = params.Plot;
    pelicula.poster = params.Poster;
    pelicula.production = params.Production;
    pelicula.rated = params.Rated;
    pelicula.release = params.Released;
    pelicula.runtime = params.Runtime;
    pelicula.title = params.Title;
    pelicula.website = params.Website;
    pelicula.writer = params.Writer;
    pelicula.year = params.Year;
    pelicula.imdbID = params.imdbID;
    pelicula.imdbRating = params.imdbRating;
    pelicula.imdbVotes = params.imdbVotes;
    pelicula.points = params.puntos;

    pelicula.save((err, peliculaStored) => {
        if (err) return res.status(500).send({
            message: "Error al guardar la pelicula"
        })
        if (!peliculaStored) return res.status(404).send({
            message: "La pelicula no ha sido guardada"
        })
        return res.status(200).send({
            pelicula: peliculaStored
        })
    })
}

function getMovies(req, res) {
    Pelicula.find().sort('points').exec(
        (err, movies) => {
            if (err) {
                res.status(400).send({ message: "Error en la peticion" })
            } else {
                res.status(200).send({ pelisbuenas: movies })
            }
        })
}

module.exports = {
    grabarPeli,
    getMovies
}