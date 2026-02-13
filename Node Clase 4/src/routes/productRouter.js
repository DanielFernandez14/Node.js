import express from "express"
import { buscarProductoPorId, buscarTodosLosProductos, eliminarProductoPorId } from "../repository/productRepository.js"

const productRouter = express.Router()


productRouter.get('/',
    async (request, response) => {
        const products = await buscarTodosLosProductos()
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Productos obtenidos exitosamente',
                data: {
                    products
                }
            }
        )
    }
)

//:id es un parametro de busqueda, sirve para que nos envien datos por medio de la URL, es este caso el id
productRouter.get('/:id',
    async (request, response) => {
        //request.params es el objeto que guardara los datos que me pasen como parametros de busqueda
        const {id} = request.params
        const product = await buscarProductoPorId(id)
        if(!product){
            return response.json(
                {
                    ok: false,
                    status: 404,
                    message: 'Producto no encontrado',
                }
            )
        }
        response.json(
            {
                ok: true,
                status: 200,
                message: 'Producto obtenido exitosamente',
                data: {
                    product
                }
            }
        )
    }
)

productRouter.post('/',
    async (request, response) => {
        const { title, price, stock, description } = request.body;

        // Validación simple
        if (!title || !price || !stock) {
            return response.json(
                {
                    ok: false,
                    status: 400,
                    message: 'Faltan campos obligatorios: title, price o stock'
                }
            );
        }

        if (typeof price !== 'number' || typeof stock !== 'number') {
            return response.json(
                {
                    ok: false,
                    status: 400,
                    message: 'price y stock deben ser números'
                }
            );
        }

        try {
            const product = await createProduct(title, price, stock, description);

            response.json(
                {
                    ok: true,
                    status: 201,
                    message: 'Producto creado exitosamente',
                    data: {
                        product
                    }
                }
            );
            return product
        } catch (error) {
            response.json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error al crear el producto'
                }
            );
        }
    }
)

productRouter.delete(
    "/:id",
    (request, response) => {

        const { id } = request.params
        const productToDelete = buscarProductoPorId(id)
        if(!productToDelete){
            return response.json(
                {
                    ok: false,
                    status: 404,
                    message: 'Producto no encontrado'
                }
            )
        }
        const product = eliminarProductoPorId(id)

        response.json({
            ok: true,
            status: 200,
            message: "Producto eliminado exitosamente",
            data: {
                product
            }
        })

    }
)


export default productRouter