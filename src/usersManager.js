import userModel from "../models/user.model.js";


export async function conseguirUsuarios() {
    try {
        return userModel.find().lean()
    } catch {
        return [];
    }
}

export async function conseguirUsuario(id) {

    return await userModel.findById(id).lean();
}

export async function agregarUsuario(datosUsuario) {
    try {
        const existe = await userModel.findOne({ email: datosUsuario.email });
        if (existe) return null;
        const nuevo = new userModel(datosUsuario)
        await nuevo.save();
        return nuevo.toObject();
    } catch (error) {
        return null;
    }
}
export async function actualizarUsuario(id, data) {
    try {
        return await userModel.findByIdAndUpdate(id, data, { new: true }).lean()
    }
    catch (error) {
        return null
    }
}

export async function borrarUsuario(id) {
    try {
        const resultado = await userModel.findByIdAndDelete(id);
        return resultado ? true : false;
    }
    catch (error) {
        return false;
    }
}
