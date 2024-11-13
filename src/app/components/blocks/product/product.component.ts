import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, NgForOf } from "@angular/common";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product";
import { LimitToPipe } from "../../../pipe/limit-to.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterModule,
    CurrencyPipe,
    NgForOf,
    LimitToPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  products?: Product[];

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (error) => console.log(error),
    });
  }
  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
