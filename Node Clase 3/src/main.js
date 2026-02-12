import connectDB from "./config/connectionDB.js";

connectDB()


import express from "express"
import ENVIRONMENT from "./config/environment.js";
import { buscarProductoPorId, buscarTodosLosProductos, createProduct } from "./repository/productRepository.js";
import productRouter from "./routes/productRouter.js";




const app = express()
app.use(express.json())



app.use('/api/products', productRouter)


app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log(`✅ Servidor escuchando en el puerto ${process.env.PORT}`
        )
    }
)
