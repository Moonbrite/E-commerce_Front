export class Product {
  constructor(
    id?: number,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    imageUrl?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
  }

  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;

}
