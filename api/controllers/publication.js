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

module.exports = {
    savePublication,
    getPublications
}