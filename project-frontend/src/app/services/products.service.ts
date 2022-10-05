import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<Product> = [];
  productMessage:string= "";
  constructor(private http:HttpClient) { this.getProducts()}
  retrieveProducts(){
    return this.http.get(`${environment.websiteURL}/browse-products`)
  }
    
  get addProductMessage(){
    return this.productMessage;
  }
  getProducts() {
    // this.retrieveProducts();
     return this.retrieveProducts().subscribe((response:any)=>{
      this.products = response;
    });
  }
  addProduct(product:Product){
    
    this.http.post(`${environment.adminURL}/add-product`,{data:JSON.stringify(product)}).subscribe((response:any)=>{
      if(response.success){
        this.productMessage = response.message;
      }
    })
  }
  deleteProduct(id:string){
    this.products.splice(this.products.findIndex((x)=>x._id == id),1);
  }
  getProductById(id:string|null):Product{
    let filtered = this.products.filter((p)=> p._id == id)
    return filtered[0];
  }
}
