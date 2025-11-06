import { Router } from "express";
import { ShopController } from "./shop.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
export class ShopRoutes {
    router;
    constructor() {
        this.router = Router();
        const shopController = new ShopController();
        this.initializeRoutes(shopController);
    }
    initializeRoutes(shopController) {
        this.router.post("/buy/:id", authMiddleware, (req, res) => shopController.BuyProduct(req, res));
    }
}
export const shopRoutes = new ShopRoutes().router;
//# sourceMappingURL=shop.routes.js.map