/* */
// console.log("Hola desde node.js")

import fs from "node:fs/promises";

// Esta funcion me permite crear archivos de forma sincronica
// filesystem.writeFileSync('test.txt', 'hola', {encoding: 'utf-8'})

// let dato = filesystem.readFileSync('dato.txt', {encoding: 'utf-8'})

// console.log(dato)



// Asyncronia ->

// async function crearArchivo(nombre, contenido) {
//     await filesystem.promises.writeFile(nombre, contenido, { encoding: "utf8" });
//     console.log(nombre);
//     console.log("El archivo se escribio correctamente");
// }


// crearArchivo('hola.txt', 'mensaje de respuesta 1 ah')
// crearArchivo('hola-2.txt', '2')

// async function leerArchivo (nombre){
//     await filesystem.promises.readFile(nombre, {encodign: 'utf-8'})
//     console.log('El archivo ' + nombre + ' se leyó')
// }

// leerArchivo('test-2.txt')
// leerArchivo('test-1.txt')


/* 

Ejercicio -> 


Crear un archivo (manualmente) numero_1.txt e ingresar un numero (aleatorio)
Crear un archivo (manualmente) numero_2.txt e ingresar un numero (aleatorio)
Leer el primer numero y guardar en una variable
Leer el segundo numero y guardar en una variable
Crear resultado.txt (pogramaticamente) donde guardamos el resultado de suma de ambos numeros

*/

async function main() {
  // Leer ambos archivos (texto)
    const num1Texto = await fs.readFile("numero_1.txt", { encoding: "utf8" });
    const num2Texto = await fs.readFile("numero_2.txt", { encoding: "utf8" });

  // Convertir a número (trim para quitar saltos de línea)
    const num1 = Number(num1Texto.trim());
    const num2 = Number(num2Texto.trim());

  // Validar que sean números
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
    throw new Error("Uno de los archivos no contiene un número válido.");
    }

  // Sumar
    const suma = num1 + num2;

  // Crear resultado.txt con la suma
    await fs.writeFile("resultado.txt", String(suma), { encoding: "utf8" });

    console.log(`num1=${num1}, num2=${num2} => suma=${suma}`);
    console.log("Listo: se creó resultado.txt");
}

main().catch(console.error);