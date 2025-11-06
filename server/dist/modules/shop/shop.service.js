import { ShopRepository } from "./repositories/shop.repositories.js";
export class ShopService {
    shopRespository;
    constructor(shopRespository = new ShopRepository()) {
        this.shopRespository = shopRespository;
    }
    async BuyProductService(id, dto) {
        const buy = await this.shopRespository.BuyProduct(id, dto);
        if (!buy)
            throw new Error("No se pudo realizar la compra");
        return { message: "La compra ha sido un exito" };
    }
}
//# sourceMappingURL=shop.service.js.map