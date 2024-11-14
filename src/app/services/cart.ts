import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { UserService } from './user';
import { User } from '../models/user';
import { environnement } from '../environement/environement';

export interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private apiUrl = environnement.apiUrl;

  userId?: number;

  constructor(private http: HttpClient, private userService: UserService) {
    // Charger le panier depuis le localStorage au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  isProductInCart(productId: number): boolean {
    return this.cartItems.value.some(item => item.product.id === productId);
  }

  /**
   * Ajout au panier selon la connexion de l'utilisateur.
   */
  addToCart(product: Product): void {
    const token = localStorage.getItem('token'); // Vérifiez si l'utilisateur est connecté

    if (token) {
      this.addToCartApi(product); // Appelle l'API si connecté
    } else {
      this.addToCartLocal(product); // Utilise le stockage local sinon
    }
  }

  /**
   * Ajoute un produit au panier en mode non connecté.
   */
  private addToCartLocal(product: Product): void {
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

  /**
   * Ajoute un produit au panier via l'API (mode connecté).
   */
  private addToCartApi(product: Product): void {
    this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
      next: data => {
        this.userId = data.id;

        this.getOrCreateCart(this.userId).subscribe({
          next: cart => {
            this.http.post(`${this.apiUrl}cart/items`, {
              quantity: 1,
              cartId: cart.id,
              productId: product.id,
            }).subscribe({
              next: () => console.log('Produit ajouté via API'),
              error: err => console.error('Erreur lors de l\'ajout via API:', err),
            });
          },
          error: err => console.error('Erreur lors de la récupération/création du panier:', err),
        });
      },
      error: err => console.error('Erreur lors de la récupération de l\'utilisateur:', err),
    });
  }

  /**
   * Récupère ou crée un panier pour l'utilisateur connecté.
   */
  private getOrCreateCart(userId: number | undefined): Observable<any> {
    if (!userId) {
      throw new Error("L'utilisateur n'est pas défini.");
    }

    return this.http.get<any[]>(`${this.apiUrl}carts/user/${userId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Si 404, créer un nouveau panier
          return this.http.post(`${this.apiUrl}carts`, { userId });
        } else {
          throw error;
        }
      })
    );
  }

  getCartItems(userId: number | undefined): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}carts/user/${userId}`);
  }

  removeFromCart(productId: number, id?: number): void {
    if (localStorage.getItem('token')) {
      // Cas authentifié : supprimer de la BD et du state local
      this.http.delete(`${this.apiUrl}cart/items/${id}`).pipe(
        tap(() => {
          // Mettre à jour le state local après succès
          const currentItems = this.cartItems.value;
          const newItems = currentItems.filter(item => item.product.id !== productId);
          this.cartItems.next(newItems);
          localStorage.setItem('cart', JSON.stringify(newItems));
        }),
        catchError(error => {
          console.error('Erreur lors de la suppression:', error);
          throw error;
        })
      ).subscribe();
      window.window.location.reload();
    } else {
      // Cas non authentifié : supprimer uniquement du state local
      const currentItems = this.cartItems.value;
      const newItems = currentItems.filter(item => item.product.id !== productId);
      this.cartItems.next(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
  }

  getCartTotal(): number {

    return this.cartItems.value.reduce((total, item) =>
      // @ts-ignore
      total + (item.product.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}
