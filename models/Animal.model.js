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
            enum: ['Perro', 'Gato', 'Ave', 'Caballo', 'Conejo','Cerdo', 'Otro'],
            required: true
        },
        genre: {
            type: [String],
            enum: ['Female', 'Male'],
            required: true
        },
        age: {
            type: Number,
            maxlength: 2,
            required: true
        },
        sterilized: {
            type: Boolean,
            required: true
        },
        diseases: {
            type: [String],
            enum: ['Yes', 'No'],
            required: true
        },
        diseases_description: {
            type: String,
        },
        microchip: {
            type: Boolean,
            required: true
        },
        microchip_number: {
            type: Number
        },
        //Si no necesita casa de acogida significa que no debe aparecer
        //en los filtros de casa de acogida porque ya esta en una o ha salido adoptado
        //Lo mismo ocurrira con un filtro de adopciones para que no aparezcan en ese apartado
        fosterhome: {
            type: [String],
            enum: ['Foster','Adoption'],
            required:true
        },
        weight: {
            type: Number,
            maxlength: 2,
            required: true
        },
        diseases: {
            type: [String],
            enum: ['Yes', 'No'],
            required: true
        },
        breed: {
            type: [String],
            enum: ['Podenco andaluz','Bodeguero andaluz','Labrador','Otra'],
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
            minlength: [5, "La descripción debe ser de al menos 300 caracteres"]
        },
        town: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
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