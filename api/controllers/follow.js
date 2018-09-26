'use strict'

var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');

function seguirUsuario(req, res) {
    var params = req.body;
    var follow = new Follow();
    follow.userLogeado = req.user.sub;
    follow.userSeguido = params.seguido;

    follow.save((err, followtored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar el seguimiento' })
        if (!followtored) return res.status(404).send({ message: "El seguimiento no se ha guardado" })
        return res.status(200).send({ follow: followtored })
    })
}

function deleteFollow(req, res) {
    var userId = req.user.sub;
    var followId = req.params.id;

    Follow.find({ 'userSeguidor': userId, 'userSeguido': followId }).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al dejar de seguir' })
        return res.status(200).send({ message: 'El seguimiento se ha eliminado!!' })
    })
}

function getFollowingUsers(req, res) {
    var userLogeado = req.user.sub;
    if (req.params.id && req.params.page) {
        userLogeado = req.params.id;
    }
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }
    var itemsPerPage = 4;

    Follow.find({ 'userSeguidor': userLogeado }).populate({ path: 'userSeguido' }).paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!follows) return res.status(200).send({ message: 'No sigue a ningun usuario' })

        return res.status(200).send({
            total,
            pages: Math.ceil(total / itemsPerPage),
            follows
        })
    })
}

// Que usuarios nos sigue a nosotros
function getFollowedUsers(req, res) {
    var userLogeado = req.user.sub;
    if (req.params.id && req.params.page) {
        userLogeado = req.params.id;
    }
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }
    var itemsPerPage = 4;

    Follow.find({ 'userSeguido': userLogeado }).populate('userSeguidor').paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!follows) return res.status(200).send({ message: 'No te sigue ningun usuario' })

        return res.status(200).send({
            total,
            pages: Math.ceil(total / itemsPerPage),
            follows
        })
    })
}
// Devolver usuarios que sigo sin paginar
function getMyFollows(req, res) {
    let userLogeado = req.user.sub;

    Follow.find({ userSeguidor: userLogeado }).populate('user followed').exec((err, follows) => {
        if (err) return res.status(500).send({ message: "Error en el servidor" });

        if (!follows) return res.status(404).send({ message: "No sigues a ningun usuario" })

        return res.status(200).send({
            follows
        })
    })

}
// Devolver usuarios que me siguen
function getFollowsBack(req, res) {

}

module.exports = {
    seguirUsuario,
    deleteFollow,
    getFollowingUsers,
    getFollowedUsers
}