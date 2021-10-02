module.exports.listAdoptions = (req, res, next) => {
    // Animal.find({fosterhome:true})
    Animal.find()
        .then((animals) => res.json(animals))
        .catch(next)
}
module.exports.animalDetail = (req, res, next) => {
    // Animal.find({fosterhome:true})
    Animal.find()
        .then((animals) => res.json(animals))
        .catch(next)
}