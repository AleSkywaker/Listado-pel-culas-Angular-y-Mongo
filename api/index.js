'use strict'

var mongoose = require('mongoose');
var app = require('./app');
require('dotenv').config();
var port = 3600;

//Conexion base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/peliculas', { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado a Mongo base de datos Peliculas');

        //Crear Servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost: ${port}`);
        })
    })
    .catch(err => console.log(err))