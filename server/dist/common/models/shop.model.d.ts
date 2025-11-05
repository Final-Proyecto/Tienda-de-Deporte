import { Document } from "mongoose";
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
}
export declare const ProductModel: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
