import mongoose from 'mongoose'
import ENVIRONMENT from './environment.js'


async function connectDB() {
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
        console.log("✅ Conectado a MongoDB")
    } catch (error) {
        console.log("📛 Error")
        console.log(error)
    }
}

export default connectDB