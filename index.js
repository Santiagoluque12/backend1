import express from "express";
import { basePath } from "./utils/basepath.js"
import productsRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"
import usersRouter from "./routes/users.routes.js";
import categoryRouter from "./routes/category.routes.js"
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.routes.js"
import mongoose from "mongoose";

const app = express();


mongoose.connect("mongodb+srv://santiluque:Familu2006@cluster0.7acflmi.mongodb.net/?appName=Cluster0")
    .then(() => console.log("Mongo conectado"))
    .catch(err => {
        console.log("Error:", err);
        process.exit(1);
    });

app.use(express.static(basePath + "/public"))
app.use(express.json());
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: basePath + "/src/views/layouts"
}))
app.set("view engine", "hbs")
app.set("views", basePath + "/src/views")

app.use("/api/category",categoryRouter)
app.use("/registrarse", viewsRouter)
app.use("/api/productos", productsRouter)
app.use("/api/carrito", cartRouter)
app.use("/api/users", usersRouter)


app.listen(8080, () => console.log("Servidor en puerto 8080"));




