import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { ValueService } from '../../services/value.service';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  promiseResponse = '';

  constructor(
    private productsService: ProductsService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe({
      next: (data) => {
        this.products = [...this.products, ...data];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          this.status = error;
        }, 3000);
      },
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.promiseResponse = rta;
  }
}
