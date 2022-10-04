import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  constructor(private productService: ProductsService) {
    this.productService.retrieveProducts().subscribe((response: any) => {
      this.products = response;
    });
  }
  ngOnInit(): void {
    // console.log(this.products);
  }
}
