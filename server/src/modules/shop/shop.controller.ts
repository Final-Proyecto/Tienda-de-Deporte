import { BuyProductDto } from "./dto/shop.dto.js";
import { ShopService } from "./shop.service.js";
import type { Request, Response } from "express";

export class ShopController {
  constructor(private shopService = new ShopService()) {}

  async BuyProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json("Id del usuario no proporcionado");
      }

      const dto = new BuyProductDto(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.image
      );

      const result = await this.shopService.BuyProductService(id, dto);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
