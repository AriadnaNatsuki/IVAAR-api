require("../config/db.config")
const mongoose = require('mongoose')
const Animal = require('../models/Animal.model')
// const Animal=require('../models/Animal.model')
let Animals = []

mongoose.connection.once('open', () => {
    console.info(`Connected to the database ${mongoose.connection.db.databaseName}`)

    mongoose.connection.db
        .dropDatabase()
        .then(() => console.log("Database cleared"))
    return Animal.insertMany(Animals)
        .then((animalsCreated) => console.log(`${animalsCreated.length} have been created`))
        .catch(e => console.error('Error disconencting from DB', e))
        .finally(() => {
            mongoose.connection.close()
                .then(() => console.log('Finish seeds.js'))
                .catch(e => console.error(e))
                .finally(() => {
                    process.exit(0)
                })
        })

})
