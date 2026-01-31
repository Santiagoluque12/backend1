import fs from "fs/promises";

const path = "./usuarios.json";

export async function conseguirUsuarios() {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function conseguirUsuario(id) {
    const usuarios = await conseguirUsuarios();
    return usuarios.find(u => u.id === Number(id));
}

export async function agregarUsuario(usuario) {
    const usuarios = await conseguirUsuarios();

    const existe = usuarios.find(u => u.email === usuario.email);
    if (existe) return null;

    const nuevo = {
        id: Date.now(),
        ...usuario
    };

    usuarios.push(nuevo);
    await fs.writeFile(path, JSON.stringify(usuarios, null, 2));
    return nuevo;
}

export async function actualizarUsuario(id, data) {
    const usuarios = await conseguirUsuarios();
    const index = usuarios.findIndex(u => u.id === Number(id));
    if (index === -1) return null;

    usuarios[index] = { ...usuarios[index], ...data };
    await fs.writeFile(path, JSON.stringify(usuarios, null, 2));
    return usuarios[index];
}

export async function borrarUsuario(id) {
    const usuarios = await conseguirUsuarios();
    const filtrados = usuarios.filter(u => u.id !== Number(id));
    if (usuarios.length === filtrados.length) return false;

    await fs.writeFile(path, JSON.stringify(filtrados, null, 2));
    return true;
}
