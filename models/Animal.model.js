const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
            //required: [true, "Name is required"],
        },
        species:{
            type: [String],
            enum: ['Perro', 'Gato', 'Ave', 'Caballo', 'Otro'],
            required: true
        },
        genre: {
            type: [String],
            enum: ['Hembra', 'Macho'],
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        sterilized: {
            type: Boolean,
            required: true
        },
        diseases: {
            type: [String],
            enum: ['Yes', 'No', 'Escribir...'],
            required: true
        },
        microchip: {
            type: Boolean,
            required: true
        },
        //Si no necesita casa de acogida significa que no debe aparecer
        //en los filtros de casa de acogida porque ya esta en una o ha salido adoptado
        //Lo mismo ocurrira con un filtro de adopciones para que no aparezcan en ese apartado
        fosterhome: {
            type: Boolean,
            required:true
        },
        weight: {
            type: Number,
            required: true
        },
        // responsible: {
        //     type: mongoose.Types.ObjectId,
        //     required: "Se requiere persona responsable",
        //     ref:User
        // }
        images:{
            type: [String],
            required: "Se requiere al menos una imagen"
        },
        description: {
            type: String,
            minlength: [300, "La descripción debe ser de al menos 300 caracteres"]
        }
    },
    {
        timestamps: true,
    }
)

animalSchema.pre("save", function (next) {
    
})
// productSchema.virtual("reviews", {
//     ref: Review.modelName,
//     localField: "_id",
//     foreignField: "product",
// });
const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;