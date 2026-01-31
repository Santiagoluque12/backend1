import { Router } from "express";
import { conseguirCarrito, agregarAlCarrito, borrarDelCarrito } from "../src/cartManager.js";

const router = Router()

router.post("/", async (req, res) => {
    const nuevo = await agregarAlCarrito(req.body);
    if (!nuevo) return res.status(400).json({ error: "Producto ya existe" });
    res.json(nuevo);
});

router.get("/", async (req, res) => {
    const carrito = await conseguirCarrito();
    res.json(carrito);
});


router.delete("/:id", async (req, res) => {
    const eliminado = await borrarDelCarrito(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
});
export default router