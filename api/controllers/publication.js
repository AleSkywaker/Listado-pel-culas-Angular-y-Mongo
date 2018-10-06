'use strict'

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const Publication = require('../models/publication');
const User = require('../models/user');
const Follow = require('../models/follow');

function savePublication(req, res) {
    let params = req.body;

    if (!params.text) return res.status(200).send({ message: "Debes enviar un texto!!" })

    let publication = new Publication();
    publication.text = params.text;
    publication.file = null;
    publication.user = req.user.sub;
    publication.create_at = moment().unix();

    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar la publicación' });

        if (!publicationStored) return res.status(404).send({ message: 'La publication NO ha sido guardada' })

        return res.status(200).send({ publicacion: publicationStored })
    })
}

function getPublications(req, res) {
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    }
    let itemsPerPage = 4;
    let userLogeado = req.user.sub;

    Follow.find({ userSeguidor: userLogeado }).populate('userSeguido').exec((err, follows) => {
        if (err) return res.status(500).send({ message: 'Error al devolver seguimiento' });

        let follows_clean = [];

        follows.forEach((follow) => {
            follows_clean.push(follow.userSeguido)
        })

        Publication.find({ user: { '$in': follows_clean } }).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) => {
            if (err) return res.status(500).send({ message: 'Error al devolver publicaciones' });
            if (!publications) return res.status(500).send({ message: 'No hay publicaciones' });

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total / itemsPerPage),
                page: page,
                publications
            })
        })
    })
}

function getPublication(req, res) {
    var publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) => {
        if (err) return res.status(500).send({ message: "Error al devolver publication" })
        if (!publication) return res.status(500).send({ message: "No existe la publication" })

        return res.status(200).send({ publications })
    })
}

function deletePublication(req, res) {
    let publicationId = req.params.id;

    Publication.find({ 'user': req.user.sub, '_id': publicationId }).remove((err, publicationRemoved) => {
        if (err) return res.status(500).send({ message: "Error al borrar publication" })
        if (!publicationRemoved) return res.status(500).send({ message: "No se ha podido eliminar la publicacion" })
        return res.status(200).send({ publicationRemoved })
    })
}

function uploadImage(req, res) {
    var publicationId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        // if (userId != req.user.sub) {
        //     return removeFilesOfUploads(res, file_path, "No tienes permisos para subir una imagen a este avatar")
        // }

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //Actualizar documento de la publicacion
            Publication.findByIdAndUpdate(publicationId, { file: file_name }, { new: true }, (err, publicationUpdated) => {
                if (err) return res.status(403).send({ message: "error al actualizar los datos del usuario" })
                if (!publicationUpdated) return res.status(404).send({ message: "No se ha podido actualizar los datos del usuario" })
                return res.status(200).send({ publication: publicationUpdated })
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
    var path_file = './uploads/publications/' + image_file;

    fs.exists(path_file, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    })
}

module.exports = {
    savePublication,
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile
}