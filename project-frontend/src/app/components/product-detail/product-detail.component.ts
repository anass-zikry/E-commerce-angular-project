import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {} as Product;
  // {name: 'Product 1',
  // price: 100,
  // discountRatio: 0,
  // category: 'sports',
  // brand: 'brand 1',
  // color: ['black','orange','blue'],
  // size: ['S','M','L','XL','XXL'],
  // isActive:true,
  // isFeatured:false,
  // imageUrl: '/assets/images/shirt.jpg',} as Product;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(id);
  }
  getPrice(): number[] {
    if (this.product.discountRatio > 0) {
      return [
        this.product.price,
        this.product.price * (1 - this.product.discountRatio),
      ];
    }
    return [this.product.price];
  }
}
