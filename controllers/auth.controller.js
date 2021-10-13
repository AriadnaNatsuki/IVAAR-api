const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports.login = (req, res, next) => {
    const { email, password } = req.body
    //Comprobar el usuario existente
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            next(
                createError(404, {
                    error: "Email o contraseña incorrecta"
                })
            )
        } else {
            user.checkPassword(password).then((match) => {
                if (!match) {
                    next(
                        createError(404, {
                            error: "Email o contraseña incorrecta"
                        })
                    )
                } else {
                    //Si la contraseña es correcta, generamos una objeto JSON con clave access_token que genera un token
                    res.json({
                        access_token:
                            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
                            jwt.sign(
                                { id: user._id },
                                process.env.JWT_SECRET || 'changeme',
                                {
                                    //El token expira en 1 día
                                    expiresIn: "1d",
                                }
                            )
                    })
                }
            })
        }
    })
}

