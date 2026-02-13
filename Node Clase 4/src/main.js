import connectDB from "./config/connectionDB.js";

connectDB()


import express from "express"
import ENVIRONMENT from "./config/environment.js";
import productRouter from "./routes/productRouter.js";
import { authRouter } from "./routes/authRouter.js";
import authorizationMiddleware from "./middlewares/authorizationMiddleware.js";




const app = express()
app.use(express.json())



app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)

app.get('/test', authorizationMiddleware, 
    (request, response) => {
        console.log("El cliente que me consulta es: ", request.user)
        response.json({
            ok: true,
            status: 200,
            message: "Test exitoso"
        })
})

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log(`✅ Servidor escuchando en el puerto ${process.env.PORT}`
        )
    }
)
