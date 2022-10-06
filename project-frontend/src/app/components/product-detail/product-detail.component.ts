import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {} as Product;
  constructor(
    private cartService:CartService,
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
  addToCart(){
    this.cartService.addProduct(this.product._id)
  }
}
