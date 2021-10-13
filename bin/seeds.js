require("../config/db.config")
const mongoose = require('mongoose')
const Animal = require('../models/Animal.model')
const User = require("../models/User.model")
// const Animal=require('../models/Animal.model')
let Animals = []

mongoose.connection.once('open', () => {
    console.info(`Connected to the database ${mongoose.connection.db.databaseName}`)

    mongoose.connection.db
        .dropDatabase()
        .then(() => console.log("Database cleared"))
        
    //Crear usuarios
    return User.insertMany(users)
        .then((usersCreated) => console.log(`${usersCreated.length} have been created`))
        .catch(e => console.error('Error disconencting from DB', e))
        .finally(() => {
            mongoose.connection.close()
                .then(() => console.log('Finish seeds.js'))
                .catch(e => console.error(e))
                .finally(() => {
                    process.exit(0)
                })
        })
//Asociar animales/alertas a usuarios que los crean
})
