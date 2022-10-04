import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<Product> = [];
  constructor(private http:HttpClient) { this.getProducts()}
  retrieveProducts(){
    return this.http.get(`${environment.websiteURL}/browse-products`)
  }
    
  
  getProducts() {
    // this.retrieveProducts();
     return this.retrieveProducts().subscribe((response:any)=>{
      this.products = response;
    });
  }
  addProduct(product:Product){
    // this.products.push(product);
    
  }
  deleteProduct(id:string){
    this.products.splice(this.products.findIndex((x)=>x._id == id),1);
  }
  getProductById(id:string|null):Product{
    // if(!id)return ;
    
    let filtered = this.products.filter((p)=> p._id == id)
    // if(filtered.length != 1)
    return filtered[0];
  }
}
