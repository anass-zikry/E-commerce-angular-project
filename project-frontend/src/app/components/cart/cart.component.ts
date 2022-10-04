import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = this.cartService.cart;
  shippingCost:number = 30;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }
  deleteProduct = this.cartService.deleteProduct;
  cartTotal = this.cartService.getTotal();
}
