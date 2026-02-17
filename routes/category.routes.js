import { Router } from "express";
import { conseguirTodasLasCategorias } from "../src/categoryManager.js";

const router = Router()

router.get("/", async (req, res) => {
    const category = await conseguirTodasLasCategorias();
    res.render('category', { categoryList: category });
});








export default router