import type { BuyProductDto } from "../dto/shop.dto.js";
export declare class ShopRepository {
    BuyProduct(id: string, dto: BuyProductDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../common/models/user.models.js").IUser, {}, {}> & import("../../../common/models/user.models.js").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
