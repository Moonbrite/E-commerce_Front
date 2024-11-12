import {Product} from "./product";

export class Item {
  constructor(
    id?: number,
    product?: Product,
    quantity?: number,
    price?: number
  ) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  id?: number;
  product?: Product;
  quantity?: number;
  price?: number;

}
