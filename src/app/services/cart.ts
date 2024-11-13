import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, from, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {UserService} from "./user";
import {User} from "../models/user";
import {environnement} from "../environement/environement";

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
  async addToCart(product: Product): Promise<void> {
    const token = localStorage.getItem('token'); // Vérifiez si l'utilisateur est connecté

    if (token) {
      await this.addToCartApi(product); // Appelle l'API si connecté
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
          ? {...item, quantity: item.quantity + 1}
          : item
      );
    } else {
      // Sinon, ajouter un nouveau produit
      newItems = [...currentItems, {product, quantity: 1}];
    }

    // Mettre à jour le panier
    this.cartItems.next(newItems);
    // Sauvegarder dans le localStorage
    localStorage.setItem('cart', JSON.stringify(newItems));
  }

  /**
   * Ajoute un produit au panier via l'API (mode connecté).
   */
  private async addToCartApi(product: Product): Promise<void> {
    try {
      // Récupérer ou créer un panier utilisateur
      const user = this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
        next: async data => {
          this.userId = data.id;
          const cart = await this.getOrCreateCart(this.userId);
          await this.http.post(`${this.apiUrl}cart/items`, {
            quantity: 1,
            cartId: cart.id,
            productId: product.id,
          }).toPromise();
        }
      })

    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier via l\'API :', error);
      throw error;
    }
  }

  /**
   * Récupère ou crée un panier pour l'utilisateur connecté.
   */
  private async getOrCreateCart(userId: number | undefined): Promise<any> {
    if (!userId) {
      throw new Error("L'utilisateur n'est pas défini.");
    }

    try {
      // Essayer de récupérer le panier existant
      const cart = await this.http.get<any[]>(`${this.apiUrl}carts/user/${userId}`).toPromise();
      if (cart && cart.length > 0) {
        return cart; // Retourne le panier si trouvé
      }
    } catch (error: any) {
      // Si l'erreur est une 404, on ignore et passe à la création d'un nouveau panier
      if (error.status !== 404) {
        console.error("Erreur lors de la récupération du panier :", error);
        throw error; // Propager les autres erreurs
      }
    }

    // Créer un nouveau panier si aucun panier n'existe
    try {
      const newCart = await this.http.post(`${this.apiUrl}carts`, { userId }).toPromise();
      return newCart; // Retourne le nouveau panier
    } catch (error) {
      console.error("Erreur lors de la création du panier :", error);
      throw error; // Propager l'erreur si la création échoue
    }
  }

  getCartItems(userId: number | undefined): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}carts/user/${userId}`);
  }


  removeFromCart(productId: number,id?:number): Observable<any> {
    if (localStorage.getItem('token')) {
      // Cas authentifié : supprimer de la BD et du state local
      return this.http.delete(`${this.apiUrl}cart/items/${id}`).pipe(
        tap(() => {
          // Après succès de la requête, mettre à jour le state local
          const currentItems = this.cartItems.value;
          const newItems = currentItems.filter(item => item.id !== id);
          this.cartItems.next(newItems);
          localStorage.setItem('cart', JSON.stringify(newItems));
        }),
        catchError(error => {
          console.error('Erreur lors de la suppression:', error);
          throw error;
        })
      );
    } else {
      // Cas non authentifié : supprimer uniquement du state local
      const currentItems = this.cartItems.value;
      const newItems = currentItems.filter(item => item.product.id !== productId);
      this.cartItems.next(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));

      // Retourner un Observable pour garder une interface cohérente
      return from(Promise.resolve({ success: true }));
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
