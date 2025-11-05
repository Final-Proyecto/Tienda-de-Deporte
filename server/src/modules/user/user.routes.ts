import { Router, type Router as RouterType } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
export class UserRoutes {
  public router: RouterType;

  constructor() {
    this.router = Router();
    const userController = new UserController();
    this.initializeRoutes(userController);
  }

  private initializeRoutes(userController: UserController): void {
    this.router.post("/register", (req, res) =>
      userController.register(req, res)
    );
    this.router.post("/login", (req, res) => userController.login(req, res));

    this.router.get("/my-products", authMiddleware, (req, res) =>
      userController.findMyProducts(req, res)
    );

    this.router.get("/profile", authMiddleware, (req, res) =>
      userController.getProfile(req, res)
    );
  }
}

export const userRoutes = new UserRoutes().router;
