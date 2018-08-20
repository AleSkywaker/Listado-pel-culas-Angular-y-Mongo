'use strict'


function grabarPeli(req, res) {
    let params = req.body;

    return res.status(200).send({ mensajedesdehell: params })
}

module.exports = {
    grabarPeli
}