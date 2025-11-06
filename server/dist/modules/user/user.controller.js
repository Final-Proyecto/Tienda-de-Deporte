import { UserService } from "./user.service.js";
import { RegisterUserDto, LoginUserDto } from "./dto/user.dto.js";
export class UserController {
    userService;
    constructor(userService = new UserService()) {
        this.userService = userService;
    }
    async register(req, res) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name) {
                return res.status(400).json("Todos los campos son obligatorios");
            }
            //dto
            const dto = new RegisterUserDto(req.body.name, req.body.email, req.body.password);
            // resultado
            const result = await this.userService.register(dto);
            //respuesta
            console.log(result);
            return res.status(201).json(result);
        }
        catch (error) {
            //errores
            return res.status(500).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json("Email o password no proporcionados");
            }
            //dto
            const dto = new LoginUserDto(req.body.email, req.body.password);
            // resultado
            const response = await this.userService.login(dto);
            return res.status(200).json(response);
        }
        catch (error) {
            //errores
            return res.status(500).json({ error: error.message });
        }
    }
    async findMyProducts(req, res) {
        try {
            const id = req.user.userId;
            if (!id) {
                return res.status(400).json("Id no proporcionado");
            }
            const result = await this.userService.findMyProducts(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user.userId;
            const user = await this.userService.getProfile(userId);
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=user.controller.js.map