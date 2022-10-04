import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Array<CartItem> = [
    {
      product: {
        _id: '1',
        name: 'Product 1',
        price: 100,
        discountRatio: 0,
        category: 'sports',
        brand: 'brand 1',
        color: ['black'],
        size: ['M'],
        isActive:true,
        isFeatured:false,
        imageUrl: '/assets/images/shirt.jpg',
      },
      count: 1,
    },
    {
      product: {
        _id: '2',
        name: 'Product 2',
        price: 200,
        discountRatio: 0,
        category: 'sports',
        brand: 'brand 2',
        color: ['orange'],
        size: ['L'],
        isActive:true,
        isFeatured:false,
        imageUrl: '/assets/images/shirt.jpg',
      },
      count: 1,
    },
  ];
  constructor() {}
  addProduct(product: Product) {
    this.cart.push({ product: product, count: 1 });
  }
  deleteProduct(product: Product) {
    this.cart.splice(
      this.cart.findIndex((x) => x.product._id == product._id),
      1
    );
  }
  getTotal():number {
    let sum: number = 0;
    for (let index = 0; index < this.cart.length; index++) {
      let discRatio: number = this.cart[index].product.discountRatio;
      if (discRatio != 0) {
        sum +=
          this.cart[index].product.price *
          (1 - discRatio) *
          this.cart[index].count;
      } else {
        sum += this.cart[index].product.price * this.cart[index].count;
      }
    }
    return sum;
  }
  // deleteProductById(id:string){
  //   this.cart.splice(this.cart.findIndex((x)=> x.product.id == id),1);
  // }
}
