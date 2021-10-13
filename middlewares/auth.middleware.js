const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports.isAuthenticated = (req, res, next) => {
    //Comprobar si existe la cabecera Authorization (cabeceras siempre primera letra mayuscula)
    const authoritation = req.header("Authorization")
    if (authoritation) {
        //Comprobar si la cabecera (header)  es de tipo Bearer
        const [type, token] = authoritation.split(" ")
        if (type === 'Bearer') {
            //jwt.verify(token, secretOrPublicKey, [options, callback])
            jwt.verify(
                token,
                process.env.JWT_SECRET || 'changeme',
                (error, decodeJwt) => {
                    if (error) {
                        //En caso de error frenar ejecucion
                        throw createError(401)
                    }
                    if (decodeJwt) {
                        //Almacenar el id de usuario en la solicitud
                        req.currentUser = decodeJwt.id
                        next()
                        return
                    }
                }
        
            )
        } else {
            throw createError(401);
        }
    } else {
        throw createError(401);
    }
}
module.exports.isNotAuthenticated = (req, res, next) => {
    //Si no existe cabecera Authorization, el user no esta autenticado
    const authorization = req.header("Authoritation")
    //Como no esta definida la cabecera, se sigue con la peticion 
    if (!authorization) {
        next()
    } else {
        next(createError(401))
    }

}