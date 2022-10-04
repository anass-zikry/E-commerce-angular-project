export interface Product {
    _id:string;
    name:string;
    price:number;
    discountRatio:number;
    category:string;
    brand:string;
    color:string[];
    size:string[];
    isActive:boolean;
    isFeatured:boolean;
    imageUrl:string;
}
