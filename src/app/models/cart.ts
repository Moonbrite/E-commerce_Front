import {Item} from "./item";

export class Cart {
  constructor(
     id?: number,
     items?: Item[]
  ) {
    this.id = id;
    this.items = items;
  }
  id?: number;
  items?: Item[];
}
