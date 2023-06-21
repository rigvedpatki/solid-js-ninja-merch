import { IProduct } from "./Product";

export interface ICartItem extends Partial<IProduct> {
  quantity: number;
}
