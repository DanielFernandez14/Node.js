import express from "express";
import { randomUUID } from "node:crypto";

const app = express();
const PORT = 8082;

/*
Una api tiene endpoints que serian las distintas acciones que podemos hacer sobre esta API
*/
/* 
Cada endpoint tiene la posibilidad de registrar multiples metodos
Los metodos HTTP se usan para separa que tipo de accion queres hacer

GET -> /api/products => Obtener lista de productos
POST -> /api/products => Crear un producto
PUT -> /api/products/:product_id => Actualizando un producto
Delete -> /api/product/:product_id => Eliminar un producto 
*/


// “Base de datos” en memoria
const productos = [
    {
        title: "Tv Samsung",
        price: 3000,
        id: randomUUID()
    },
    {
        title: "Tv Samsung 42",
        price: 4000,
        id: randomUUID()
    }
];

app.use(express.json());

// GET -> listar productos
app.get("/products", (req, res) => {
    res.json({
        ok: true,
        products: productos
    });
});

// POST -> crear producto
app.post("/products", (req, res) => {
    const { title, price } = req.body;

    // Validación mínima
    if (!title || price == null) {
        return res.status(400).json({
            ok: false,
            message: "Faltan datos: title y price son obligatorios"
        });
    }

    const new_product = {
        title: String(title),
        price: Number(price),
        id: randomUUID()
    };

    productos.push(new_product);

    console.log("📦 Producto agregado:", new_product);

    res.status(201).json({
        ok: true,
        message: "Producto agregado",
        product: new_product
    });
});

app.listen(PORT, () => {
    console.log(`La app se está ejecutando en el puerto: ${PORT}`);
});
