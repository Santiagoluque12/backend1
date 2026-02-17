import categoryModel from "../models/category.model.js"

export async function conseguirTodasLasCategorias() {    try {
        return await categoryModel.find().lean()
    } catch {
        return [];
    }
    
} 
