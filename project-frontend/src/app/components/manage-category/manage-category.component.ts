import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
})
export class ManageCategoryComponent implements OnInit {
  newCategory: string = '';
  delState: string = '';
  addState: string = '';
  constructor(private category: CategoryService) {
  }

  ngOnInit(): void {}

  getCategoryTitles() {
    return this.category.thisCategories;
  }
  deleteCategory(title: string) {
    this.category.delete(title).subscribe((response: any) => {
      if (response.success) {
        this.category.fetchCategories();
      } else {
        this.delState = response.message;
      }
    });
  }
  addCategory() {
    if(!this.getValid()){
      this.addState = 'Please enter a valid title'
    }
    else{
      this.addState = '';
    this.category.add(this.newCategory).subscribe((response: any) => {
      if (response.success) {
        this.category.fetchCategories();
        this.newCategory = '';
      } else {
        this.addState = response.message;
      }
    });
  }
  }
  getValid(): boolean {
    if (this.newCategory.length < 3) return false;
    return true;
  }
}
