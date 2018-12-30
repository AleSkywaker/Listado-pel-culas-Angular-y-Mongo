"use strict";

//Express nos permite trabajar con protocolo HTTP, cargar rutas etc..
var express = require("express");
//parsea datos desde cuerpo a formato json
var bodyParser = require("body-parser");

//instaciamos objeto express
var app = express();

//Configuracion para socketIO
const http = require("http");
let httpServer = http.Server(app);

const socketIO = require("socket.io");
let io = socketIO(httpServer);

io.on("connect", cliente => {
  console.log("cliente conectado" + cliente);
});

//Cargamos rutas
var user_routes = require("./routes/user");
var pelicula_routes = require("./routes/pelicula");
var follow_routes = require("./routes/follow");
var publication_routes = require("./routes/publication");
var message_route = require("./routes/message");
//middlewares, es un metodo que se ejecuta antes de un controlador, en cada peticion se ejectutará este middleware
app.use(bodyParser.urlencoded({ extended: false }));
//convertimos todo los que nos llegue en json
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//rutas
app.use("/api", user_routes);
app.use("/api", pelicula_routes);
app.use("/api", follow_routes);
app.use("/api", publication_routes);
app.use("/api", message_route);

//exportar (exportamos lo que app tenga)
module.exports = httpServer;
