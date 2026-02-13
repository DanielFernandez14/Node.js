import dotenv from 'dotenv'


dotenv.config()

//Opcional: Crear un diccionario donde guardo mis variables de entorno para tenerlas accesibles
const ENVIRONMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export default ENVIRONMENT