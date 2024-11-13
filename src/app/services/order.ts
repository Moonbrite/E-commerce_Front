import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {concatMap, from, Observable} from 'rxjs';
import {environnement} from "../environement/environement";
import {CartItem} from "./cart";
import {switchMap} from "rxjs/operators";



export interface OrderItem {
  productId: number;
  quantity: number;
  price: number; // Optionnel : prix à l'instant de la commande
}

export interface Order {
  userId: number; // Si applicable
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environnement.apiUrl+"orders"; // Remplace par l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Crée une commande avec ses items
  // Crée une commande avec ses items
  createOrder(cartItems: CartItem[], userId: number): Observable<any> {
    const orderItems = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price, // Assure-toi que ce champ est bien défini
      orderId: null // L'Order ID sera défini plus tard
    }));


    const order = {
      userId,
      // @ts-ignore
      totalPrice: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    // Étape 1 : Créer la commande
    return this.http.post<Order>(`${this.apiUrl}`, order).pipe(
      switchMap(createdOrder => {
        // Associer l'Order ID généré à chaque item
        // @ts-ignore
        orderItems.forEach(item => (item.orderId = createdOrder.id));

        // Étape 2 : Effectuer une requête par item
        return from(orderItems).pipe(
          concatMap(item =>
            this.http.post(`http://localhost:8081/api/order/items`, item)
          )
        );
      })
    );
  }


}
