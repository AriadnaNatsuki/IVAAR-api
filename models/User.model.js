const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [EMAIL_PATTERN, "Email is invalid"],
        },
        role: {
            type: [String],
            enum: ['Particular', 'Protectora', 'Abogado/a', 'Veterinario/a']
            //default: 'Particular'
        },
        name: {
            type: String,
            required: "Name is required",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [10, "Password is too short"],
        },
        identification_professional: {
            type: Number,
            //required: true,
            minlength: [10, "El número de colegiado debe tener una longitud de 10 caracteres"],
            maxlength: [10, "El número de colegiado debe tener una longitud de 10 caracteres"]
        },
        identification_particular: {
            type: String,
           //required: true,
            minlength: [9, "El NIF/NIE debe tener una longitud de 9 caracteres"],
        },

        image: {
            type: String,
            validate: {
                validator: (value) => {
                    try {
                        return value
                            .map((v) => new URL(v))
                            .every((v) => v.protocol === "http:" || v.protocol === "https:")
                        // const url = new URL(value);
                        // return url.protocol === "http:" || url.protocol === "https:";
                    } catch (err) {
                        return false;
                    }
                },
                message: () => "Invalid image URL",
            },
        },
        autor: {
            type: mongoose.Types.ObjectId,
           // required:true,
            ref:"User"
        }
    },
    {
        timestamps: true,
    }
);
//Pre save hace que se hashee la contraseña en la base de datos
userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;