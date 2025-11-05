import { ShopService } from "./shop.service.js";
import type { Request, Response } from "express";
export declare class ShopController {
    private shopService;
    constructor(shopService?: ShopService);
    BuyProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
