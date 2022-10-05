import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, CartItem } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart = {} as Cart;
  shippingCost: number = 30;
  cartTotal: number = 0;
  get thisCart() {
    return this.cart;
  }
  get shipping() {
    return this.shippingCost;
  }
  get total() {
    return this.cartTotal;
  }
  constructor(private http: HttpClient, private product: ProductsService) {
  }
  findCart() {
    return this.http.get(`${environment.websiteURL}/find-cart`);
  }
  create(productIdArr: string[]) {
    return this.http.post(
      `${environment.websiteURL}/new-cart`,
      JSON.stringify({ productIdArr: productIdArr })
    );
  }
  getCart() {
    this.findCart().subscribe((response: any) => {
      if (response.success) {
        this.cart._id = response.result._id;
        this.cart.userId = response.result.userId;
        this.cart.cartItems = response.result.products.map(
          (p: { productId: string; count: number }) => {
            let product: Product = this.product.getProductById(p.productId);
            let count: number = p.count;
            return { product: product, count: count };
          }
        );
      } else {
        this.create([]).subscribe((response: any) => {
          if (response.success) {
            this.cart._id = response.result._id;
            this.cart.userId = response.result.userId;
            this.cart.cartItems = response.result.products.map(
              (p: { productId: string; count: number }) => {
                let product: Product = this.product.getProductById(p.productId);
                let count: number = p.count;
                return { product: product, count: count };
              }
            );
          }
        });
      }
      this.getTotal();
    });
  }
  addProduct(productId: string) {
    this.http
      .post(
        `${environment.websiteURL}/cart-addproduct`,
        JSON.stringify({ productId: productId })
      )
      .subscribe((response: any) => {
        if (response.success) {
          let currentProduct = this.product.getProductById(productId);
          let index = this.cart.cartItems.findIndex((x) => {
            x.product == currentProduct;
          });
          if (index >= 0) {
            this.cart.cartItems[index].count++;
          } else {
            this.cart.cartItems.push({ product: currentProduct, count: 1 });
          }
        }
        this.getTotal();
      });
  }
  removeProduct(productId: string) {
    this.http
      .post(
        `${environment.websiteURL}/cart-removeproduct`,
        JSON.stringify({ productId: productId })
      )
      .subscribe((response: any) => {
        if (response.success) {
          let index: number = this.cart.cartItems.findIndex((x) => {
            x.product._id == productId;
          });
          this.cart.cartItems[index].count--;
          if (this.cart.cartItems[index].count == 0) {
            this.cart.cartItems.splice(index, 1);
          }
        }
        this.getTotal();
      });
  }
  deleteProduct(productId: string) {
    this.http
      .post(
        `${environment.websiteURL}/cart-deleteproduct`,
        JSON.stringify({ productId: productId })
      )
      .subscribe((response: any) => {
        if (response.success) {
          let index: number = this.cart.cartItems.findIndex((x) => {
            x.product._id == productId;
          });
          this.cart.cartItems.splice(index, 1);
        }
        this.getTotal();
      });
  }
  getTotal(): void {
    if (!this.cart.cartItems) {
      this.cartTotal = 0;
    } else {
      let sum: number = 0;
      for (let index = 0; index < this.cart.cartItems.length; index++) {
        let discRatio: number =
          this.cart.cartItems[index].product.discountRatio;
        if (discRatio != 0) {
          sum +=
            this.cart.cartItems[index].product.price *
            (1 - discRatio) *
            this.cart.cartItems[index].count;
        } else {
          sum +=
            this.cart.cartItems[index].product.price *
            this.cart.cartItems[index].count;
        }
      }
      this.cartTotal = sum;
    }
  }
}
