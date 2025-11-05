import { BuyProductDto } from "./dto/shop.dto.js";
import { ShopService } from "./shop.service.js";
export class ShopController {
    shopService;
    constructor(shopService = new ShopService()) {
        this.shopService = shopService;
    }
    async BuyProduct(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json("Id del usuario no proporcionado");
            }
            const dto = new BuyProductDto(req.body.name, req.body.description, req.body.price, req.body.image);
            const result = await this.shopService.BuyProductService(id, dto);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=shop.controller.js.map