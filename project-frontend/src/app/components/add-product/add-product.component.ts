import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  // categories:string[] = [];
  constructor(private category: CategoryService, private brand: BrandService) {
    this.category.fetchCategories();
    this.brand.fetchBrands();
  }
  productform: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(null),
    discountRatio: new FormControl(0),
    category: new FormControl(''),
    brand: new FormControl(''),
    color: new FormControl([]),
    size: new FormControl([]),
    imageUrl: new FormControl(''),
  });
  ngOnInit(): void {}
  getCategoryTitles() {
    return this.category.categoryTitlesArr;
  }
  getBrandTitles(): string[] {
    return this.brand.brandsArr.map((v, i) => {
      return v.title;
    });
  }
  addProduct() {
    console.log(this.productform);
    
  }
  fill(){
    this.productform.patchValue({
      name: 'Product 3',
    price: 300,
    discountRatio: 0,
    imageUrl: '/assets/images/shirt3.avif',
    })
  }
}
