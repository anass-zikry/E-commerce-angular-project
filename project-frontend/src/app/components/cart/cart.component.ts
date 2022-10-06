import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {
    this.cartService.getCart();
  }
  cart = this.cartService.thisCart;
  shippingCost: number = this.cartService.shipping;
  // cartTotal:number = this.cartService.total;

  ngOnInit(): void {
  }
  deleteProduct(productId:string){
    this.cartService.deleteProduct(productId);
  }
  getTotal():number{
    return this.cartService.total;
  }
}
