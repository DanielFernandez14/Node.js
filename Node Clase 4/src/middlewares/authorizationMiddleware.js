import ENVIRONMENT from "../config/environment.js"
import jwt from "jsonwebtoken"

function authorizationMiddleware (request, response, next){
    try {
        // El header authorization es donde se suele enviar el token de sesión. 
    const authorization_header = request.headers.authorization

    // Si no está/existe podemos asumir que no lo tiene y lanzar error
    if(!authorization_header){
        throw new ServerError('No hay token de autenticación', 401)
    }

    // Si existe el header authorization, vamos a extraer el token
    const auth_token = authorization_header.split(' ')[1]
    if(!auth_token){
        throw new ServerError('No hay token', 401)
    }
    //Verifico que el token sea valido
    const payload = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET_KEY)

    //Guardo en la consulta de mi servidor los datos de sesión de mi usuario
    request.user = payload

    //Permite que el middleware finalice y pase al siguiente middleware/controlador
    next()
    } catch (error) {
        if(error.status){
            response.status(error.status).json({
                ok: false,
                status: error.status,
                message: error.message
            })
        } 
        else {
            console.log('Error interno del servidor', error)
            response.status(500).json({
                ok: false,
                status: 500,
                message: (error.message)
            })
        }
    }
}

export default authorizationMiddleware
