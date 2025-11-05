import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../core/config/index.js";
import { UserRepository } from "./repositories/user.repositories.js";
import type { LoginUserDto, RegisterUserDto } from "./dto/user.dto.js";

export class UserService {
  constructor(private userRespository = new UserRepository()) {}

  //REGISTRO
  async register(dto: RegisterUserDto) {
    const existing = await this.userRespository.findByEmail(dto.email);
    if (existing) throw new Error("Email ya registrado");

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    dto.password = hashedPassword;
    await this.userRespository.create({ ...dto });

    return { message: "Usuario registrado correctamente" };
  }

  //INICIO DE SESION
  async login(dto: LoginUserDto) {
    const user = await this.userRespository.findByEmail(dto.email);

    if (!user)
      throw new Error(
        "No existe un usuario registrado con ese correo electronico"
      );

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ sub: user._id }, config.jwtSecret, {
      expiresIn: "7d",
    });
    return {
      token,
      message: "Sesión iniciada correctamente",
    };
  }

  //OBTENER PERFIL DE USUARIO
  async getProfile(userId: string) {
    const user = await this.userRespository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user.toJSON();
  }
  //OBTENER PRODUCTOS DEL USUARIO
  async findMyProducts(id: string) {
    const products = await this.userRespository.findMyProducts(id);
    return products;
  }
}
