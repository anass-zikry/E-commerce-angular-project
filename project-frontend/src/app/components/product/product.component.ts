import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product:Product = {} as Product;
  constructor(private cartService:CartService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.addProduct(this.product)
    console.log(this.cartService.cart);
    
  }
  productClickHandler(){
    this.router.navigate(['product-detail',{id:this.product._id}],{relativeTo: this.route, skipLocationChange: true})
  }
}
