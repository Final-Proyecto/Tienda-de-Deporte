import { Document } from "mongoose";
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
export declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
