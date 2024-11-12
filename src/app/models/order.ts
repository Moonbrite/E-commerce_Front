import {Item} from "./item";
import {Payment} from "./payment";

export class Order {
  constructor(
    id?: number,
    items?: Item[],
    payments?: Payment[],
    orderDate?: Date,
    paymentStatus?: string,
    totalPrice?: number
  ) {
    this.id = id;
    this.items = items;
    this.payments = payments;
    this.orderDate = orderDate;
    this.paymentStatus = paymentStatus;
    this.totalPrice = totalPrice;
  }

  id?: number;
  items?: Item[];
  payments?: Payment[];
  orderDate?: Date;
  paymentStatus?: string;
  totalPrice?: number;
}
