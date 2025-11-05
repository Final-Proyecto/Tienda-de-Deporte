export class BuyProductDto {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public image: string
  ) {}
}
