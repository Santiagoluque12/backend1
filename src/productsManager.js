import fs from "fs/promises";

const path = "./productos.json";

export async function conseguirProductos() {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function conseguirProducto(id) {
    const productos = await conseguirProductos();
    return productos.find(p => p.id === Number(id));
}

export async function agregarProducto(producto) {
    const productos = await conseguirProductos();

    const existe = productos.find(p => p.nombre === producto.nombre);
    if (existe) return null;

    const nuevo = {
        id: Date.now(),
        ...producto
    };

    productos.push(nuevo);
    await fs.writeFile(path, JSON.stringify(productos, null, 2));
    return nuevo;
}

export async function actualizarProducto(id, data) {
    const productos = await conseguirProductos();
    const index = productos.findIndex(p => p.id === Number(id));
    if (index === -1) return null;

    productos[index] = { ...productos[index], ...data };
    await fs.writeFile(path, JSON.stringify(productos, null, 2));
    return productos[index];
}

export async function borrarProducto(id) {
    const productos = await conseguirProductos();
    const filtrados = productos.filter(p => p.id !== Number(id));
    if (productos.length === filtrados.length) return false;

    await fs.writeFile(path, JSON.stringify(filtrados, null, 2));
    return true;
}
