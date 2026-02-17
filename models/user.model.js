import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    numero: { type: Number, required: true },
}, {
    timestamps: true
});

const userModel = mongoose.model("usuarios", userSchema);
export default userModel;