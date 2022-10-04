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
  categoryTitles: string[] = [];
  constructor(private http: HttpClient) {}
  get categoryTitlesArr(){
    return this.categoryTitles;
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
        let counter = 0;
        for (let c of this.categories) {
          this.categoryTitles[counter] = c.title;
        }
      });
  }
}
