import productsModel from "../models/products.model.js"

export async function conseguirProductos() {
    try {
        return await productsModel.find().populate("categoria","nombre").lean()
    } catch {
        return [];
    }
}

export async function conseguirProducto(id) {
    try{return await productsModel.findById(id).lean()} catch(error)
    {return null
}}

export async function agregarProducto(producto) {
    try {
        const existe = await productsModel.findOne({ nombre: producto.nombre });
        if (existe) return null;
        const nuevo = await productsModel.create(producto)
        return nuevo.toObject();
    } catch (error) {
        return null;
    }
}


export async function actualizarProducto(id, data) {
    try {
        return await productsModel.findByIdAndUpdate(id, data, { new: true }).lean()
    }
    catch (error) {
        return null
    }
}

export async function borrarProducto(id) {
    try {
        const resultado = await productsModel.findByIdAndDelete(id);
        return !!resultado ;
    }
    catch (error) {
        return false;
    }
}
export async function obtenerProductoPorPrecio() {
    try {
        return await productsModel
            .find()
            .sort({ precio: 1, stock: -1 })
            .lean();
    } catch {
        return [];
    }
}
