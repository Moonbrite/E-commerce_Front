import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Charger le panier depuis le localStorage au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    let newItems: CartItem[];

    if (existingItem) {
      // Si le produit existe déjà, augmenter la quantité
      newItems = currentItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Sinon, ajouter un nouveau produit
      newItems = [...currentItems, { product, quantity: 1 }];
    }

    // Mettre à jour le panier
    this.cartItems.next(newItems);
    // Sauvegarder dans le localStorage
    localStorage.setItem('cart', JSON.stringify(newItems));
  }

  removeFromCart(productId: number): void {
    const newItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  }

  updateQuantity(productId: number, quantity: number): void {
    const newItems = this.cartItems.value.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0);

    this.cartItems.next(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) =>
      // @ts-ignore
      total + (item.product.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }



}
