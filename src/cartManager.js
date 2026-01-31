import fs from "fs/promises";

const path = "./carrito.json";

export async function conseguirCarrito() {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function agregarAlCarrito(producto) {
    const carrito = await conseguirCarrito();

    const existe = carrito.find(p => p.id === producto.id);
    if (existe) return null;

    const nuevo = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad || 1,
        stock: producto.stock,
        categoria:producto.categoria,
    };

    carrito.push(nuevo);
    await fs.writeFile(path, JSON.stringify(carrito, null, 2));
    return nuevo;
}

export async function borrarDelCarrito(id) {
    const carrito = await conseguirCarrito();
    const filtrado = carrito.filter(p => p.id !== Number(id));
    await fs.writeFile(path, JSON.stringify(filtrado, null, 2));
    return filtrado;
}
