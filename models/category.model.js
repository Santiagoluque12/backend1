import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
}, {
    timestamps: true
});

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;