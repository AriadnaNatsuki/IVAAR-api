const Animal = require("../models/Animal.model")
const createError=require('http-errors')

module.exports.listAdoptions = (req, res, next) => {
    // Animal.find({fosterhome:true})
    Animal.find()
        .then((animals) => res.json(animals))
        .catch(next)
}
module.exports.animalDetail = (req, res, next) => {
    // Animal.find({fosterhome:true})
    Animal.findById(req.params.id)
        .then((animal) => {
            if (!animal) {
                next(createError(404))
            } else {
                res.json(animal)
            }
        })
        .catch (next)
}