import {Cart} from "./cart";
import {Order} from "./order";


export class User {
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    password?: string,
    cart?: Cart,
    orders?: Order[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.password = password;
    this.cart = cart;
    this.orders = orders;
  }

  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  password?: string;
  cart?: Cart;
  orders?: Order[];


}
