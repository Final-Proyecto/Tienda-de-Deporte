import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
export class UserRoutes {
    router;
    constructor() {
        this.router = Router();
        const userController = new UserController();
        this.initializeRoutes(userController);
    }
    initializeRoutes(userController) {
        this.router.post("/register", (req, res) => userController.register(req, res));
        this.router.post("/login", (req, res) => userController.login(req, res));
        this.router.get("/my-products", authMiddleware, (req, res) => userController.findMyProducts(req, res));
        this.router.get("/profile", authMiddleware, (req, res) => userController.getProfile(req, res));
    }
}
export const userRoutes = new UserRoutes().router;
//# sourceMappingURL=user.routes.js.map