import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "../../services/product";
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from "@angular/router";
import { Product } from "../../models/product";
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { LimitToPipe } from "../../pipe/limit-to.pipe";
import { filter, Subscription } from 'rxjs';

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
export class ProductDetailComponent implements OnInit, OnDestroy {
  private routerSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: string | null = null;
  product?: Product;
  products?: Product[];

  ngOnInit(): void {
    // Initial load
    this.loadProduct();

    // Subscribe to router events
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Reload data when navigation ends
      this.loadProduct();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private loadProduct(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.productService.getAll().subscribe({
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
    // Implement cart logic
  }
}
