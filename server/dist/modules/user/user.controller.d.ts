import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
export declare class UserController {
    private userService;
    constructor(userService?: UserService);
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findMyProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response): Promise<void>;
}
