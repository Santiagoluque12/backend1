import { Router } from "express";
import {
    conseguirProductos,
    conseguirProducto,
    agregarProducto,
    actualizarProducto,
    borrarProducto,
} from "../src/productsManager.js";

const router = Router()
router.get("/", async (req, res) => {
    const productos = await conseguirProductos();
    res.json(productos);
});

router.get("/:id", async (req, res) => {
    const producto = await conseguirProducto(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
});

router.post("/", async (req, res) => {
    const nuevo = await agregarProducto(req.body);
    if (!nuevo) return res.status(400).json({ error: "Producto ya existe" });
    res.json(nuevo);
});

router.put("/:id", async (req, res) => {
    const actualizado = await actualizarProducto(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(actualizado);
});

router.delete("/:id", async (req, res) => {
    const eliminado = await borrarProducto(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
});

export default router