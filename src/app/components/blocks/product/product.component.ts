import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, NgForOf } from "@angular/common";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product";
import { LimitToPipe } from "../../../pipe/limit-to.pipe";
import { RouterModule } from '@angular/router';
import { Category } from '../../../models/category'; // Importez le modèle Category si nécessaire

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
  products?: Product[];
  filteredProducts?: Product[];
  categories?: Category[]; // Liste des catégories
  activeCategoryId?: number; // ID de la catégorie active

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Récupérer les produits
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialement, tous les produits sont affichés
        this.extractCategories(data); // Extraire les catégories des produits
      },
      error: (error) => console.log(error),
    });
  }

  // Extraire les catégories uniques des produits
  private extractCategories(products: Product[]): void {
    const categoriesMap = new Map<number, Category>();
    products.forEach(product => {
      if (product.category && !categoriesMap.has(<number>product.category.id)) {
        if (product.category.id != null) {
          categoriesMap.set(product.category.id, product.category);
        }
      }
    });
    this.categories = Array.from(categoriesMap.values());
  }

  // Filtrer les produits par catégorie
  filterByCategory(categoryId?: number): void {
    this.activeCategoryId = categoryId;
    if (categoryId) {
      this.filteredProducts = this.products?.filter(product => product.category?.id === categoryId);
    } else {
      this.filteredProducts = this.products; // Afficher tous les produits si aucune catégorie n'est sélectionnée
    }
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
