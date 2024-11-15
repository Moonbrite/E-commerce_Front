import {Category} from "./category";

export class Product {
  constructor(
    id: number,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    imageUrl?: string,
    category?:Category
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
    this.category = category;
  }

  id: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  category?: Category;

}
