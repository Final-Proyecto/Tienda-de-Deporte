// src/common/models/User.model.ts
import { Schema, model, Document } from "mongoose";
import { ProductModel } from "./shop.model.js";

export interface IUserProduct {
  productId: string;
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  products: IUserProduct[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
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

export const UserModel = model<IUser>("User", UserSchema);
