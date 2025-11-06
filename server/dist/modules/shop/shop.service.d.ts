import type { BuyProductDto } from "./dto/shop.dto.js";
import { ShopRepository } from "./repositories/shop.repositories.js";
export declare class ShopService {
    private shopRespository;
    constructor(shopRespository?: ShopRepository);
    BuyProductService(id: string, dto: BuyProductDto): Promise<{
        message: string;
    }>;
}
