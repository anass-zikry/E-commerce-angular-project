import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  constructor(private productService: ProductsService,private cartService:CartService) {
    this.productService.retrieveProducts().subscribe((response: any) => {
      this.products = response;
    });
  }
  ngOnInit(): void {
    // console.log(this.products);
  }
  addToCartHandler(event:string){
    this.cartService.addProduct(event);
  }
}
