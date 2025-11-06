import { Schema, model, Document } from "mongoose";
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export const ProductModel = model("Product", ProductSchema);
//# sourceMappingURL=shop.model.js.map