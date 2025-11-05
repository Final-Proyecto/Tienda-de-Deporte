import { ProductModel } from "../../../common/models/shop.model.js";
import { UserModel } from "../../../common/models/user.models.js";
import type { BuyProductDto } from "../dto/shop.dto.js";

export class ShopRepository {
  async BuyProduct(id: string, dto: BuyProductDto) {
    const create = await ProductModel.create(dto);
    return await UserModel.findByIdAndUpdate(id, {
      $push: {
        products: {
          productId: create._id,
        },
      },
    });
  }
}
