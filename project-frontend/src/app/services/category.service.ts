import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
//dont forget to update category products array in db when a product is added
export class CategoryService {
  categories: Array<Category> = [];
  constructor(private http: HttpClient) {this.fetchCategories()}
  get thisCategories(){
    return this.categories;
  }
  // getCategories() {
  //   let cats: string[] = [];
  //   console.log(this.categories);

  //   console.log(cats);
  //   return cats;
  // }
  fetchCategories() {
    this.http
      .get(`${environment.adminURL}/list-categories`)
      .subscribe((response: any) => {
        this.categories = response;
      });
  }
  add(title:string){
    return this.http.post(`${environment.adminURL}/add-category`,JSON.stringify({title:title}))
  }
  delete(title:string){
    return this.http.post(`${environment.adminURL}/delete-category`,JSON.stringify({title:title}));
  }
}
