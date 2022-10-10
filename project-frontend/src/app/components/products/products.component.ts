import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input() selectedPrices: number[] = [];
  @Input() selectedColors: string[] = [];
  @Input() selectedSizes: string[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {
    // this.productService.retrieveProducts();
    // this.productService.retrieveProducts().subscribe((response: any) => {
    //   this.products = response;
    // });
  }

  ngOnInit(): void {}
  getProducts(): Array<Product> {
    // console.log(
    //   this.productService.getFiltered(
    //     this.selectedPrices,
    //     this.selectedColors,
    //     this.selectedSizes
    //   )
    // );
    return this.productService.getFiltered(
      this.selectedPrices,
      this.selectedColors,
      this.selectedSizes
    );
  }
  addToCartHandler(event: string) {
    this.cartService.addProduct(event);
  }
}
