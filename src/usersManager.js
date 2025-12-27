import { promises as fspromises } from "fs"
import crypto from "crypto"

export const guardarUsuarios = async (usuarios) => {
    try {
        await fspromises.writeFile("usuarios.json", JSON.stringify(usuarios, null, 2), "utf-8")
        console.log("usuarios guardados")
    }
    catch (error) {
        console.log("error al guardar", error)
    }
}

export const conseguirUsuarios = async () => {
    try {
        const data = await fspromises.readFile("usuarios.json", "utf-8")
        return JSON.parse(data)
    }
    catch (error) {
        if (error.code === "ENOENT") {
            await guardarUsuarios([])
        }
        console.log("error")
        return []
    }
}

export const conseguirUsuario = async (id) => {
    try {
        const lista = await conseguirUsuarios()
        const usuario = lista.find(item => item.id === id)
        if (!usuario) { return {} }
        return usuario
    }
    catch (error) {
        console.log("error")
    }
}

export const agregarUsuario = async (usuario) => {
    try {

        const listaActual = await conseguirUsuarios()
        const id = crypto.randomUUID()
        const existe = listaActual.some(item => item.telefono === usuario.telefono &&
            item.nombre === usuario.nombre
        )
        if (existe) {
            return console.log("usuario ya existe")
        }
        listaActual.push({ id, ...usuario })
        await guardarUsuarios(listaActual)
    }
    catch (error) { console.log("error") }
}

export const actualizarUsuario = async (id, actualizarUser) => {
    try {
        const usuarios = await conseguirUsuarios()
        const existe = usuarios.find(usuario => usuario.id === id)
        if (!existe) {
            console.log("el usuario no existe")
            return null
        }
        const listaActualizada = usuarios.map(usuario => {

            if (usuario.id === id) {
                if (actualizarUser.nombre) usuario.nombre = actualizarUser.nombre
                if (actualizarUser.telefono) usuario.telefono = actualizarUser.telefono
                if (actualizarUser.apellido) usuario.apellido = actualizarUser.apellido
            }
            return usuario
        })
        await guardarUsuarios(listaActualizada)
    }
    catch (error) {
        console.log(error, "error")
    }
}

export const borrarUsuario=async (id)=>{
    try{
        const usuarios = await conseguirUsuarios()
        const existe = usuarios.find(usuario => usuario.id === id)
                if (!existe) {
            console.log("el usuario no existe")
            return null
        }
        const eliminarUsuario=usuarios.filter(usuario=>usuario.id !== id)
        await guardarUsuarios(eliminarUsuario)
    }
    catch(error){
        console.log("error al eliminar usuario")
    }

}
const init = async () => {
await borrarUsuario("a8a14a84-4952-40ab-b8c1-692e800d38cd"
)

}
init()