import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre: { type: String, required: true, index:true, },
    imagen: {type: String  },
    precio:{type: Number, required:true},
    stock:{type: Number,required:true},
    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category",
        required: true 
    },
},{
    timestamps: true
})
productsSchema.index({precio:1,stock:-1})
const productsModel = mongoose.model("productos", productsSchema);

export default productsModel;