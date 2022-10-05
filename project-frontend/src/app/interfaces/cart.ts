import { Product } from "./product";

export interface CartItem {
    product:Product;
    count:number;
}

export interface Cart {
    _id:string;
    userId:string;
    cartItems:Array<CartItem>;
}