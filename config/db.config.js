const mongoose = require('mongoose')
const { db, dbName } = require('../constants/db')

mongoose
    .connect(db, {})
    .then(() => console.log(`Succesfully connected to ${dbName}`))
    .catch((error) => console.log("Error connecting to DB", error))

process.on("SIGNINT", () => {
    mongoose.connection
        .close()
        .then(() => console.log("Successfully disconnected from DB"))
        .catch((e) => console.error("Error disconnecting from DB", e))
        .finally(() => process.exit());
})