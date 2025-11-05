import { Router, type Router as RouterType } from "express";
import { ShopController } from "./shop.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

export class ShopRoutes {
  public router: RouterType;

  constructor() {
    this.router = Router();
    const shopController = new ShopController();
    this.initializeRoutes(shopController);
  }

  private initializeRoutes(shopController: ShopController): void {
    this.router.post("/buy/:id", authMiddleware, (req, res) =>
      shopController.BuyProduct(req, res)
    );
  }
}

export const shopRoutes = new ShopRoutes().router;
