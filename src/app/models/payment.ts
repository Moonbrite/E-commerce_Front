export class Payment {
  constructor(
    id?: number,
    paymentIntentId?: string,
    amount?: number,
    status?: string,
    currency?: string
  ) {
    this.id = id;
    this.paymentIntentId = paymentIntentId;
    this.amount = amount;
    this.status = status;
    this.currency = currency;
  }

  id?: number;
  paymentIntentId?: string;
  amount?: number;
  status?: string;
  currency?: string;

}
