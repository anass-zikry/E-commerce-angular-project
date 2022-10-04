import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand } from '../interfaces/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brands:Array<Brand> = [];
  constructor(private http:HttpClient) { }
  get brandsArr(){
    return this.brands;
  }
  fetchBrands(){
    this.http.get(`${environment.adminURL}/list-brands`).subscribe((response:any)=>{
      this.brands = response;
    })
  }
}
