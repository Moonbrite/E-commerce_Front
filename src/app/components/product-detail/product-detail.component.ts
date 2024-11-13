import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from "../../services/product";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Product } from "../../models/product";
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { LimitToPipe } from "../../pipe/limit-to.pipe";
import { switchMap } from 'rxjs/operators';
import {CartService} from "../../services/cart";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    NgIf,
    NgForOf,
    LimitToPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  id: string | null = null;
  product?: Product;
  products?: Product[];
  addingToCart = false;

  // Ajout d'une propriété pour indiquer si le produit est déjà dans le panier
  isInCart = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = params.get('id');
        return this.productService.getAll();
      })
    ).subscribe({
      next: (data: Product[]) => {
        if (this.id) {
          this.product = data.find(product => product.id?.toString() === this.id) || undefined;
          this.products = data.filter(product => product.id?.toString() !== this.id);

          // Vérifiez si le produit est déjà dans le panier
          if (this.product) {
            this.cartService.cartItems$.subscribe(items => {
              this.isInCart = items.some(item => item.product.id === this.product!.id);
            });
          }
        } else {
          this.products = data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async addToCart(product: Product | undefined) {
    if (!product || this.isInCart) return; // Bloque si déjà dans le panier

    this.addingToCart = true;
    try {
      await this.cartService.addToCart(product); // Appelle le service
      this.isInCart = true; // Met à jour le statut

      this.snackBar.open(
        `L'image "${product.name}" a bien été ajoutée au panier.`,
        "Fermer",
        {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'top',
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur lors de l'ajout au panier");
    } finally {
      this.addingToCart = false;
    }
  }
}

