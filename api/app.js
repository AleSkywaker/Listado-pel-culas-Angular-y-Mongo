'use strict'

//Express nos permite trabajar con protocolo HTTP, cargar rutas etc..
var express = require('express');
//parsea datos desde cuerpo a formato json
var bodyParser = require('body-parser');

//instaciamos objeto express
var app = express();

//Cargamos rutas
var user_routes = require('./routes/user')
    //middlewares, es un metodo que se ejecuta antes de un controlador, en cada peticion se ejectutará este middleware
app.use(bodyParser.urlencoded({ extended: false }));
//convertimos todo los que nos llegue en json
app.use(bodyParser.json())

//cors

//rutas
app.use('/api', user_routes)

//exportar (exportamos lo que app tenga)
module.exports = app;