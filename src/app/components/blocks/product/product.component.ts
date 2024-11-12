import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) {
  }


  products?: Product[];

  ngOnInit(): void {

    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (error) => console.log(error),
    });

  }


}
