import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Product} from "../../models/product";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {

  }

  id: string | null = null;
  product?: Product;
  products?: Product[];

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        if (this.id) {
          this.product = data.find(product => product.id?.toString() === this.id) || undefined;
          this.products = data.filter(product => product.id?.toString() !== this.id);
        } else {
          // Si aucun ID n'est fourni, tous les produits sont dans le tableau
          this.products = data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(product: Product | undefined) {

  }
}
