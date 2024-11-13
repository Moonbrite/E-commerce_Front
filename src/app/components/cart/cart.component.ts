import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem, CartService} from "../../services/cart";
import {OrderService} from "../../services/order";
import {Router} from "@angular/router";

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

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router:Router
    ) {}

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

  onPay(): void {
    if (!this.cartItems.length) {
      alert('Votre panier est vide.');
      return;
    }

    // Supposons que l'utilisateur est connecté avec un ID (sinon, ajuste)
    const userId = 1; // Remplace par l'ID de l'utilisateur connecté

    this.orderService.createOrder(this.cartItems, userId).subscribe({
      next: (order) => {
        alert('Commande passée avec succès !');
        this.cartService.clearCart(); // Vider le panier
      },
      error: (error) => {
        console.error(error);
        alert('Erreur lors du paiement. Veuillez réessayer.');
      }
    });
  }

}
