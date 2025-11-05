import { RegisterUserDto } from "../dto/user.dto.js";
export declare class UserRepository {
    private user;
    constructor(user?: import("mongoose").Model<import("../../../common/models/user.models.js").IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, import("../../../common/models/user.models.js").IUser, {}, {}> & import("../../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>);
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../common/models/user.models.js").IUser, {}, {}> & import("../../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    create(user: RegisterUserDto): Promise<import("mongoose").Document<unknown, {}, import("../../../common/models/user.models.js").IUser, {}, {}> & import("../../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../common/models/user.models.js").IUser, {}, {}> & import("../../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findMyProducts(id: string): Promise<void>;
}
