import express from "express"
import { agregarUsuario } from "./usersManager.js"

const app = express()

app.listen(8080, () => console.log("server 8080"))


app.get("/usuarios", (req, res) => {
    res.json(usuarios)
})
app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params
    const usuariosID = usuarios.find(usuario => usuario.id === Number(id))
    res.json(usuariosID)
})
app.post("/usuarios", async(req, res) => {
const body = req.body
const usersManager = new agregarUsuario("usuarios.json")
await usersManager.añadirUsuario(body)
res.json({message:"add"})
})