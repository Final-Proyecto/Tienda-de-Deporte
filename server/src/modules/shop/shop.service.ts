import type { BuyProductDto } from "./dto/shop.dto.js";
import { ShopRepository } from "./repositories/shop.repositories.js";

export class ShopService {
  constructor(private shopRespository = new ShopRepository()) {}

  async BuyProductService(id: string, dto: BuyProductDto) {
    const buy = await this.shopRespository.BuyProduct(id, dto);

    if (!buy) throw new Error("No se pudo realizar la compra");

    return { message: "La compra ha sido un exito" };
  }
}
