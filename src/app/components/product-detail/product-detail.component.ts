import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Product } from "../../models/product";
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { LimitToPipe } from "../../pipe/limit-to.pipe";
import { switchMap } from 'rxjs/operators';
import {CartService} from "../../services/cart";

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
  ) {}

  id: string | null = null;
  product?: Product;
  products?: Product[];
  addingToCart = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = params.get('id');
        return this.productService.getAll();
      })
    ).subscribe({
      next: (data: Product[]) => {
        if (this.id) {
          this.product = data.find(product => product.id?.toString() === this.id) || undefined;
          this.products = data.filter(product => product.id?.toString() !== this.id);
        } else {
          this.products = data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(product: Product | undefined) {
    if (!product) return;

    this.addingToCart = true;
    try {
      this.cartService.addToCart(product);
      // Optionnel : Ajouter une notification ou un message de succès
      alert('Produit ajouté au panier avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      alert('Erreur lors de l\'ajout au panier');
    } finally {
      this.addingToCart = false;
    }
  }
}
