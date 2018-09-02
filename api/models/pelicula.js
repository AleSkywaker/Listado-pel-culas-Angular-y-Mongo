'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PeliculasSchema = Schema({
    // user: { type: Schema.ObjectId, ref: 'User' },
    actors: String,
    awards: String,
    country: String,
    fechaDvd: String,
    director: String,
    genre: String,
    language: String,
    plot: String,
    poster: String,
    production: String,
    rated: String,
    release: String,
    runtime: String,
    title: String,
    website: String,
    writer: String,
    year: String,
    imdbID: String,
    imdbRating: String,
    imdbVotes: String,
    points: String,
    porcentaje: String,
    type: String
})

module.exports = mongoose.model('Pelicula', PeliculasSchema);