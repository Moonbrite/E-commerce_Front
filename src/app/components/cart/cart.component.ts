import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem, CartService} from "../../services/cart";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getCartTotal();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }


  clearCart(): void {
    this.cartService.clearCart();
  }

}
