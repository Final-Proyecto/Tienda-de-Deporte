import { Schema, model, Document } from "mongoose";
import { ProductModel } from "./shop.model.js";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: ProductModel,
                required: true,
            },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=user.models.js.map