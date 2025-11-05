import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = model<IProduct>("Product", ProductSchema);
