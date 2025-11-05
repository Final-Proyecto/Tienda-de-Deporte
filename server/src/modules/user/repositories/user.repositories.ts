import { RegisterUserDto } from "../dto/user.dto.js";
import { UserModel } from "../../../common/models/user.models.js";

export class UserRepository {
  constructor(private user = UserModel) {}

  async findByEmail(email: string) {
    return await this.user.findOne({ email }).exec();
  }

  async create(user: RegisterUserDto) {
    return await this.user.create(user);
  }

  async findById(id: string) {
    return await this.user.findById(id).populate("products.productId").exec();
  }

  async findMyProducts(id: string) {}
}
