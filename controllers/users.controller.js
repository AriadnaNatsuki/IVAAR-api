const User = require('../models/User.model')

module.exports.getCurrentUser = (req, res, next) => {
    //Sacamos el user logado (de la base de datos) a partir de su token actual
    User.findById(req.currentUser)
        .then((user) => res.json(user))
        .catch(next)
}

module.exports.createUser = (req, res, next) => {
    //Multer inyecta en la request (peticion) un objeto file con path como key, y eso es lo que le pasaremos al body para que pueda recuperar
    //la URL (file.path) y mostrarla mas adelante cuando se la requiera
    if (req.file) {
        req.body.file = req.file.path;
    }
    User.create(req.body)
        .then((user) => res.json(user))
        .catch(next)
}