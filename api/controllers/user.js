'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const Follow = require('../models/follow');
const jwtService = require('../services/jwt');
const mongoosePaginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');

function pruebas(req, res) {
    return res.status(200).send({ message: "Hola guapo", user: req.user })
}


function saveUser(req, res) {
    let params = req.body;
    let user = new User();
    if (params.password != params.password2) {
        return res.status(200).send({ message: "Las contraseñas NO son iguales" })
    }
    if (params.name && params.surname && params.nick && params.email && params.password) {

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        user.description = params.description;
        user.created_at = Date.now();

        User.find({
            $or: [{ email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) { return res.status(500).send({ message: "Error al guardar el usuario" }) }
            if (users && users.length >= 1) { return res.status(200).send({ message: "El email o nick ya existe en la base de datos" }) } else {

                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: "Error al guardar el usuario" })
                        if (userStored) {
                            user.password = ";)",
                                res.status(200).send({
                                    user: userStored,
                                    message: "¡¡Usuario registrado correctamente!!"
                                });
                        } else {
                            res.status(404).send({ message: "No se ha registrado el usuario" });
                        }
                    })
                })
            }
        })
    } else {
        res.status(200).send({ message: "Debes rellenar todos los campos" })
    }
}

function loginUser(req, res) {
    let params = req.body;
    let email = params.email;
    let password = params.password;
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    //devolver datos usuario
                    if (params.gettoken) {
                        //generar y devolver token
                        return res.status(200).send({
                            token: jwtService.createToken(user),
                            message: "Usuario logeado correctamente"
                        })
                    } else {
                        //Devolver datos de usuario
                        user.password = undefined;
                        return res.status(200).send({
                            user,
                            message: "Usuario logeado correctamente"
                        })
                    }
                } else {
                    return res.status(500).send({ message: '¡¡Usuario o contraseña incorrecta!!' })
                }
            })
        } else {
            return res.status(500).send({ message: 'El usuario no existe o la contraseña es incorrecta!!' })
        }
    })
}

//Conseguir datos de un usuario

function getUser(req, res) {
    console.log()
    let userID = req.params.id;

    User.findById(userID, (err, user) => {
        if (err) return res.status(403).send({ message: "error al devolver usuario" })
        if (!user) return res.status(404).send({ message: "El usuario no existe" })

        Follow.findOne({ userSeguidor: req.user.sub, userSeguido: userID }).exec((err, follow) => {
            if (err) return res.status(403).send({ message: "error al comprobar el seguimiento" })
            user.password = ":)"
            return res.status(200).send({
                user,
                follow
            })
        })
    })
}

async function followThisUser(identity_user_id, user_id) {
    var siguiendo = await Follow.findOne({ userSeguidor: identity_user_id, userSeguido: user_id })
        .exec((err, follow) => {
            if (err) return handleError(err)
            return follow
        })
    var seguido = await Follow.findOne({ userSeguidor: user_id, userSeguido: identity_user_id })
        .exec((err, follow) => {
            if (err) return handleError(err)
            return follow
        })
}

function getUsers(req, res) {
    let userLogeado = req.user.sub;
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    }

    let userPerPage = 5;

    User.find().sort('_id').paginate(page, userPerPage, (err, users, total) => {
        if (err) return res.status(403).send({ message: "error al devolver los usuarios" })
        if (!users) return res.status(404).send({ message: "No existen usuarios" })

        return res.status(200).send({
            usuarios: users,
            totalusuarios: total,
            paginas: Math.ceil(total / userPerPage)
        })
    })
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    //borrar propiedad password
    delete update.password;
    if (userId != req.user.sub) {
        return res.status(500).send({ message: "No tienes permisos para actualizar los datos del usuario" })
    }
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(403).send({ message: "error al actualizar los datos del usuario" })
        if (!userUpdated) return res.status(404).send({ message: "No se ha podido actualizar los datos del usuario" })
        return res.status(200).send({ user: userUpdated })
    })
}

function uploadImage(req, res) {
    var userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (userId != req.user.sub) {
            return removeFilesOfUploads(res, file_path, "No tienes permisos para subir una imagen a este avatar")
        }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //Actualizar documento de usuario logeado
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(403).send({ message: "error al actualizar los datos del usuario" })
                if (!userUpdated) return res.status(404).send({ message: "No se ha podido actualizar los datos del usuario" })
                return res.status(200).send({ user: userUpdated })
            })
        } else {
            return removeFilesOfUploads(res, file_path, "Extension no valida")
        }
    } else {
        return res.status(200).send({ message: 'No se han subido imagenes' })
    }
}

function removeFilesOfUploads(res, file, message) {
    fs.unlink(file, (err) => {
        return res.status(200).send({ message: message })
    })
}

function getImageFile(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './uploads/users/' + image_file;

    fs.exists(path_file, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    })
}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile
}