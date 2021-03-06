"use strict";

const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const Follow = require("../models/follow");
const Publication = require("../models/publication");
const Pelicula = require("../models/pelicula");
const jwtService = require("../services/jwt");
const mongoosePaginate = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");

function saveUser(req, res) {
  let params = req.body;
  let user = new User();
  if (params.password != params.password2) {
    return res.status(200).send({ message: "Las contraseñas NO son iguales" });
  }
  if (params.name && params.email && params.password) {
    user.name = params.name;
    user.surname = params.surname;
    user.nick = params.nick;
    user.email = params.email;
    user.role = "ROLE_USER";
    user.image = null;
    user.description = params.description;
    user.created_at = Date.now();

    User.find({
      // $or: [{ email: user.email.toLowerCase() },
      //     { nick: user.nick.toLowerCase() }
      // ]
      email: user.email.toLowerCase()
    }).exec((err, users) => {
      if (err) {
        return res.status(500).send({ message: "Error al guardar el usuario" });
      }
      if (users && users.length >= 1) {
        return res.status(200).send({ message: "Esta email ya existe" });
      } else {
        bcrypt.hash(params.password, null, null, (err, hash) => {
          user.password = hash;
          user.save((err, userStored) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error al guardar el usuario" });
            if (userStored) {
              (user.password = ";)"),
                res.status(200).send({
                  user: userStored,
                  message: "¡¡Usuario registrado correctamente!!"
                });
            } else {
              res
                .status(404)
                .send({ message: "No se ha registrado el usuario" });
            }
          });
        });
      }
    });
  } else {
    res.status(200).send({ message: "Debes rellenar todos los campos" });
  }
}

function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;
  User.findOne({ email: email }, (err, user) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          //devolver datos usuario
          if (params.gettoken) {
            //generar y devolver token
            return res.status(200).send({
              token: jwtService.createToken(user)
            });
          } else {
            //Devolver datos de usuario
            user.password = undefined;
            return res.status(200).send({
              user,
              message: "Usuario logeado correctamente"
            });
          }
        } else {
          return res
            .status(500)
            .send({ message: "¡¡Usuario o contraseña incorrecta!!" });
        }
      });
    } else {
      return res.status(500).send({
        message: "El usuario no existe o la contraseña es incorrecta!!"
      });
    }
  });
}

//Conseguir datos de un usuario

function getUser(req, res) {
  console.log();
  let userID = req.params.id;

  User.findById(userID, (err, user) => {
    if (err)
      return res.status(403).send({ message: "error al devolver usuario" });
    if (!user) return res.status(404).send({ message: "El usuario no existe" });

    followThisUser(req.user.sub, userID).then(value => {
      user.password = undefined;
      return res.status(200).send({
        user,
        siguiendo: value.siguiendo,
        seguido: value.seguido
      });
    });
  });
}

async function followThisUser(identity_user_id, user_id) {
  try {
    var siguiendo = await Follow.findOne({
      userSeguidor: identity_user_id,
      userSeguido: user_id
    })
      .exec()
      .then(siguiendo => {
        return siguiendo;
      })
      .catch(err => {
        return handleError(err);
      });
    var seguido = await Follow.findOne({
      userSeguidor: user_id,
      userSeguido: identity_user_id
    })
      .exec()
      .then(seguido => {
        return seguido;
      })
      .catch(err => {
        return handleError(err);
      });
    return {
      siguiendo,
      seguido
    };
  } catch (e) {
    console.log(e);
  }
}

function getUsers(req, res) {
  let userLogeado = req.user.sub;
  let page = 1;

  if (req.params.page) {
    page = req.params.page;
  }

  let userPerPage = 4;

  User.find()
    .sort("_id")
    .paginate(page, userPerPage, (err, users, total) => {
      if (err)
        return res
          .status(403)
          .send({ message: "error al devolver los usuarios" });
      if (!users)
        return res.status(404).send({ message: "No existen usuarios" });

      followUserIds(userLogeado).then(value => {
        return res.status(200).send({
          usuarios: users,
          usuariosSeguidos: value.siguiendo,
          usuarioMeSiguen: value.seguido,
          totalusuarios: total,
          paginas: Math.ceil(total / userPerPage)
        });
      });
    });
}

async function followUserIds(user_id) {
  try {
    var siguiendo = await Follow.find({ userSeguidor: user_id })
      .select({ _id: 0, _v: 0, userSeguidor: 0 })
      .exec()
      .then(follows => {
        var seguidores = [];
        follows.forEach(follow => {
          console.log("follow primer:", follow);
          seguidores.push(follow.userSeguido);
        });
        return seguidores;
      })
      .catch(err => {
        return handleError(err);
      });
    var seguido = await Follow.find({ userSeguido: user_id })
      .select({ _id: 0, _v: 0, userSeguido: 0 })
      .exec()
      .then(follows => {
        var seguidores = [];
        follows.forEach(follow => {
          console.log("follow segundo:", follow);
          seguidores.push(follow.userSeguidor);
        });
        console.log(seguidores);
        return seguidores;
      })
      .catch(err => {
        return handleError(err);
      });
    return {
      siguiendo: siguiendo,
      seguido: seguido
    };
  } catch (e) {
    console.log(e);
  }
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;
  //borrar propiedad

  delete update.password;
  if (userId != req.user.sub) {
    return res.status(500).send({
      message: "No tienes permisos para actualizar los datos del usuario"
    });
  }
  if (update.image == "" || update.image == null || update.image == undefined) {
    return res
      .status(200)
      .send({ message: "Debe Seleccionar una imagen o subir la tuya propia" });
  }
  console.log(update);
  User.find({
    $or: [{ email: update.email }, { nick: update.nick }]
  }).exec((err, users) => {
    console.log(users);
    var user_isset = false;
    users.forEach(user => {
      if (user && user._id != userId) user_isset = true;
    });
    if (user_isset)
      return res.status(200).send({ message: "Los datos ya estan en uso" });
    User.findByIdAndUpdate(
      userId,
      update,
      { new: true },
      (err, userUpdated) => {
        if (err)
          return res
            .status(403)
            .send({ message: "error al actualizar los datos del usuario" });
        if (!userUpdated)
          return res.status(404).send({
            message: "No se ha podido actualizar los datos del usuario"
          });
        return res.status(200).send({
          user: userUpdated,
          message: "Se han actualizado tus datos correctamente"
        });
      }
    );
  });
}

function uploadImage(req, res) {
  var userId = req.params.id;

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split("\\");
    var file_name = file_split[2];
    var ext_split = file_name.split(".");
    var file_ext = ext_split[1];

    if (userId != req.user.sub) {
      return removeFilesOfUploads(
        res,
        file_path,
        "No tienes permisos para subir una imagen a este avatar"
      );
    }

    if (
      file_ext == "png" ||
      file_ext == "jpg" ||
      file_ext == "jpeg" ||
      file_ext == "gif"
    ) {
      //Actualizar documento de usuario logeado
      User.findByIdAndUpdate(
        userId,
        { image: file_name },
        { new: true },
        (err, userUpdated) => {
          if (err)
            return res
              .status(403)
              .send({ message: "error al actualizar los datos del usuario" });
          if (!userUpdated)
            return res.status(404).send({
              message: "No se ha podido actualizar los datos del usuario"
            });
          return res.status(200).send({ user: userUpdated });
        }
      );
    } else {
      return removeFilesOfUploads(res, file_path, "Extension no valida");
    }
  } else {
    return res.status(200).send({ message: "No se han subido imagenes" });
  }
}

function removeFilesOfUploads(res, file, message) {
  fs.unlink(file, err => {
    return res.status(200).send({ message: message });
  });
}

function getImageFile(req, res) {
  var image_file = req.params.imageFile;
  var path_file = "./uploads/users/" + image_file;

  fs.exists(path_file, exist => {
    if (exist) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "No existe la imagen" });
    }
  });
}

function getCounters(req, res) {
  let userLogeado = req.user.sub;
  if (req.params.id) {
    userLogeado = req.params.id;
  }
  getCounterFollow(userLogeado).then(value => {
    res.status(200).send(value);
  });
}

async function getCounterFollow(user_id) {
  try {
    var numeroSeguidos = await Follow.count({ userSeguidor: user_id })
      .exec()
      .then(count => {
        return count;
      })
      .catch(err => {
        return handleError(err);
      });
    var numeroSeguidores = await Follow.count({ userSeguido: user_id })
      .exec()
      .then(count => {
        return count;
      })
      .catch(err => {
        return handleError(err);
      });
    var publications = await Publication.count({ user: user_id })
      .exec()
      .then(count => {
        return count;
      })
      .catch(err => {
        return handleError(err);
      });
    return {
      numeroSeguidos,
      numeroSeguidores,
      publications,
      stats: [
        {
          seguidos: numeroSeguidos,
          seguidores: numeroSeguidores,
          publicaciones: publications
        }
      ]
    };
  } catch (e) {
    console.log(e);
  }
}

function esCompatible(req, res) {
  let userId = req.params.id;
  let userLogeado = req.user.sub;

  compatibilidad(userId, userLogeado).then(v => {
    if (v.pelisuser.length < 10) {
      return res.status(200).send({
        message: "elige por lo menos 10 pelis para saber compatibilidad"
      });
    }
    return res.status(200).send({ compatibilidad: v });
  });
}

async function compatibilidad(user_logeado, user_seguido) {
  let pelisUserLogeado = await Pelicula.find({ user: user_logeado })
    .limit(10)
    .sort("-points")
    .exec()
    .then(peliculas => {
      let arraysDeIds = [];
      peliculas.forEach(peli => {
        arraysDeIds.push(peli.imdbID);
      });
      return arraysDeIds;
    });
  let pelisUserSeguido = await Pelicula.find({ user: user_seguido })
    .limit(10)
    .sort("-points")
    .exec()
    .then(peliculas => {
      let arraysDeIds = [];
      peliculas.forEach(peli => {
        arraysDeIds.push(peli.imdbID);
      });
      return arraysDeIds;
    });
  let contador = await Pelicula.countDocuments({
    user: user_seguido,
    imdbID: { $in: pelisUserLogeado }
  })
    .exec()
    .then(count => {
      return count;
    });

  let pelisIguales = await Pelicula.find({
    user: user_seguido,
    imdbID: { $in: pelisUserLogeado }
  })
    .exec()
    .then(iguales => {
      return iguales;
    });
  return {
    pelisuser: pelisUserLogeado,
    pelisuser2: pelisUserSeguido,
    compatibilidad: contador,
    coincidencias: pelisIguales
  };
}
module.exports = {
  saveUser,
  loginUser,
  getUser,
  getUsers,
  getCounters,
  updateUser,
  uploadImage,
  getImageFile,
  esCompatible
};
