'use strict'

const Pelicula = require('../models/pelicula');
const moment = require('moment')

function grabarPeli(req, res) {
    let params = req.body;

    let aux = (params.puntos / 10) * 100;

    var pelicula = new Pelicula();
    pelicula.porcentaje = (aux / 10) * 10;
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

    if (pelicula.points == null || pelicula.points == undefined || pelicula.points == "") {
        return res.status(402).send({
            message: 'Debes indicar tu puntos',
        })
    }
    if (pelicula.points < 0 || pelicula.points > 10) {
        return res.status(402).send({ message: 'Los puntos deben estar entre 0 y 10' })
    }

    Pelicula.find({ imdbID: pelicula.imdbID })
        .exec((err, peli) => {
            if (err) {
                return res.status(406).send({ message: "Error al encontrar pelicula" })
            }
            if (peli && peli.length >= 1) {
                return res.status(405).send({ message: "!NO SE HA GUARDADO ESTA PELICULA¡ dado que esta pelicula ya se encuentra en su lista personal" })
            }
            //Guarda pelicula
            pelicula.save((err, peliculaStored) => {
                if (err) return res.status(500).send({
                    message: "Error al guardar la pelicula"
                })
                if (!peliculaStored) return res.status(404).send({
                    message: "La pelicula no ha sido guardada"
                })
                return res.status(200).send({
                    pelicula: peliculaStored,
                    message: "Pelicula guardada correctamente!!"
                })
            })
        })
}

function getMovies(req, res) {
    Pelicula.find().sort('points').exec(
        (err, movies) => {
            if (err) {
                res.status(400).send({ message: "Error en la peticion" })
            } else {
                res.status(200).send({
                    pelisbuenas: movies
                })
            }
        })
}

function deleteMovie(req, res) {
    let movieID = req.params.id;

    Pelicula.find({ 'imdbID': movieID }).remove(
        (err) => {
            if (err) return res.status(500).send({
                message: "Error al eliminar publicacion"
            })
            return res.status(200).send({
                message: "La publicacion ha sido eliminada"
            })
        })
}
module.exports = {
    grabarPeli,
    getMovies,
    deleteMovie
}