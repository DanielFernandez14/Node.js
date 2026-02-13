// Los controladores se encargan de manejar las peticiones y las respuestas 
import bcrypt from "bcrypt"
import ServerError from "../helper/serverError.js"
import { buscarPorEmail, createUser } from "../repository/userRepository.js"
import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"


export async function register(request, response){
    try {
        const {email, password} = request.body
        const user_found = await buscarPorEmail(email)
        if(user_found) {
            //throw corta la ejecución de TRY y lanza un error
            throw new ServerError('El usuario ya existe', 400)
        }

        // El numero 10 es la complejidad de la encriptación, a mayor númer mayor complejidad y tambien tiempo de encriptación
        const password_crypted = await bcrypt.hash(password, 10)



        await createUser(email, password_crypted)
        response.status(201).json({
            ok: true,
            status: 201,
            message: 'Usuario creado exitosamente',
            data: null
        })
    } catch (error) {
        // Esto maneja errores del servidor
        // Hay dos grandes errores -> manejables o esperable (son controlados por nosotros, por ejemplo busqué un usuario que no existe) y los no manejables: aquellos excepciones o fallos en el código. No lo podemos prevenir y no podemos controlar -> se cae AWS, la db explota, bug sin corrección en producción. 
        if(error.status){
            // Si hay status de error significa que es esperale ese error y respondere con el mensaje y status
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


export async function login (request, response){
    try {
        const {email, password} = request.body
        const user_found = await buscarPorEmail(email)
        if(!user_found){
            throw new ServerError('El usuario no existe', 404)
        }

        const isSamePassword = await bcrypt.compare(password,user_found.password)
        if(!isSamePassword){
            throw new ServerError('Contraseña Incorrecta', 401)
        }
        const auth_token = jwt.sign(
            {
            email, 
            id: user_found._id, 
            created_at: user_found.created_at},
            ENVIRONMENT.JWT_SECRET_KEY, {expiresIn: '1d'})
            
        response.status(200).json({
            ok: true,
            status: 200,
            message: "Login exitoso",
            data: {
                token: auth_token
            }
        })

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
