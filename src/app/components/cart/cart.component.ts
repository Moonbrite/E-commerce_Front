import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CartItem, CartService} from "../../services/cart";
import {OrderService} from "../../services/order";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CurrencyPipe,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  userId?:number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {

    if (window.localStorage.getItem("token")) {

      this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
        next:  data => {
          this.userId = data.id;

          this.cartService.getCartItems(this.userId).subscribe({
            next: data => {
              this.cartItems = data.items;

              this.cartTotal = this.cartTotal = this.cartItems.reduce((total, item) => {
                // @ts-ignore
                return total + (item.product.price * item.quantity);
              }, 0);

            }
          })

        }
      })

    } else {
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
        this.cartTotal = this.cartService.getCartTotal();
      });
    }

  }

  removeFromCart(productId: number, id: number | undefined): void {
    this.cartService.removeFromCart(productId,id)
  }



  onPay(): void {
    if (!this.cartItems.length) {
      alert('Votre panier est vide.');
      return;
    }


    this.userService.findUserByEmail(this.userService.getEmailToken()).subscribe({
      next: (data) => {

        this.userId = data.id;

        this.orderService.createOrder(this.cartItems, this.userId).subscribe({
          next: (order) => {
            this.snackBar.open(
              `L'achat a bien été effectué 🥳`,
              "Fermer",
              {
                duration: 3000,
                horizontalPosition: 'left',
                verticalPosition: 'top',
              }
            );

            this.cartService.clearCart(); // Vider le panier
            this.router.navigate([""]).then(() => { this.cartService.clearCart()})
          },
          error: (error) => {
            console.error(error);
            alert('Erreur lors du paiement. Veuillez réessayer.');
          }
        });

      },
      error: (error) => {console.log(error);}
    })


  }


}
