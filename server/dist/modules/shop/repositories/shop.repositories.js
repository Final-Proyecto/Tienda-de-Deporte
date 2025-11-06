import { ProductModel } from "../../../common/models/shop.model.js";
import { UserModel } from "../../../common/models/user.models.js";
export class ShopRepository {
    async BuyProduct(id, dto) {
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
//# sourceMappingURL=shop.repositories.js.map