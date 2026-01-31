import { Router } from "express";
import {
    conseguirUsuarios,
    conseguirUsuario,
    agregarUsuario,
    actualizarUsuario,
    borrarUsuario
} from "../src/usersManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const usuarios = await conseguirUsuarios();
        res.render('users', { usersList: usuarios });
    } catch (error) {
        res.status(500).send("Error al cargar usuarios");
    }
});

router.get("/:id", async (req, res) => {
    const usuario = await conseguirUsuario(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
});

router.post("/", async (req, res) => {
    const nuevo = await agregarUsuario(req.body);
    if (!nuevo) return res.status(400).json({ error: "El usuario ya existe" });
    res.json(nuevo);
});

router.put("/:id", async (req, res) => {
    const actualizado = await actualizarUsuario(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(actualizado);
});

router.delete("/:id", async (req, res) => {
    const eliminado = await borrarUsuario(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
});

export default router;
