import { UserRepository } from "./repositories/user.repositories.js";
import type { LoginUserDto, RegisterUserDto } from "./dto/user.dto.js";
export declare class UserService {
    private userRespository;
    constructor(userRespository?: UserRepository);
    register(dto: RegisterUserDto): Promise<{
        message: string;
    }>;
    login(dto: LoginUserDto): Promise<{
        token: string;
        message: string;
    }>;
    getProfile(userId: string): Promise<import("mongoose").FlattenMaps<import("../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>>;
    findMyProducts(id: string): Promise<void>;
}
