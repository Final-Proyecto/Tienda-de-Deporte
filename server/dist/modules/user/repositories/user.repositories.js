import { RegisterUserDto } from "../dto/user.dto.js";
import { UserModel } from "../../../common/models/user.models.js";
export class UserRepository {
    user;
    constructor(user = UserModel) {
        this.user = user;
    }
    async findByEmail(email) {
        return await this.user.findOne({ email }).exec();
    }
    async create(user) {
        return await this.user.create(user);
    }
    async findById(id) {
        return await this.user.findById(id).populate("products.productId").exec();
    }
    async findMyProducts(id) { }
}
//# sourceMappingURL=user.repositories.js.map