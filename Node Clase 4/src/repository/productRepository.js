// Repository suele ser un archivo donde vas a manejar la comunicacion de la DB


// CRUD

import Product from "../models/productModel.js"

export async function createProduct(title, price, stock, description) {
    const product = await Product.create({
        title,
        price,
        stock,
        description
    });
    return product

    console.log(product);
}


export async function buscarProductoPorId (product_id){
    const product = await Product.findById(product_id)
    console.log(product)
    return product
}
// buscarProductoPorId('698ce5381c371e6157cca325')


export async function buscarTodosLosProductos(){
    const products = await Product.find()
    console.log(products)
    return products
}
// buscarTodosLosProductos()


export async function eliminarProductoPorId (product_id){
    const product = await Product.findByIdAndDelete(product_id)
    console.log(product)
    return product
}
// eliminarProductoPorId('698ce5381c371e6157cca325')


export async function actualizarProductoPorId(product_id, title, price, stock, description){
    const product = await Product.findByIdAndUpdate(product_id, {title, price, stock, description}, {new: true})
    console.log(product)
    return product
}






