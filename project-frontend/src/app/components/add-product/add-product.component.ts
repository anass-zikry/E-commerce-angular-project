import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { retryWhen } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  // disableButton:boolean = (this.selectedColors.length>0 && this.selectedSizes.length>0);
  colors: string[] = [
    'blue',
    'red',
    'green',
    'purple',
    'black',
    'orange',
    'yellow',
    'gold',
    'white',
    'silver',
  ];
  sizes: string[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  constructor(
    private category: CategoryService,
    private brand: BrandService,
    private product: ProductsService
  ) {
    this.category.fetchCategories();
    this.brand.fetchBrands();
  }
  productform: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    discountRatio: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    isFeatured: new FormControl(false),
    imageUrl: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  getStatus() {
    return this.product.addProductMessage;
  }
  getCategoryTitles() {
    return this.category.categoryTitlesArr;
  }
  getBrandTitles(): string[] {
    return this.brand.brandsArr.map((v, i) => {
      return v.title;
    });
  }
  addProduct() {
    this.productform.patchValue({
      color: this.selectedColors,
      size: this.selectedSizes,
    });

    this.product.addProduct(this.productform.value);
  }
  colorSelect(event: any) {
    if (this.selectedColors.find((x) => x == event.target.value)) {
    } else {
      this.selectedColors.push(event.target.value);
    }
  }
  deleteColors() {
    this.selectedColors = [];
  }
  sizeSelect(event: any) {
    if (this.selectedSizes.find((x) => x == event.target.value)) {
    } else {
      this.selectedSizes.push(event.target.value);
    }
  }
  deleteSizes() {
    this.selectedSizes = [];
  }
  getDisableButton(): boolean {
    return !(
      this.selectedColors.length > 0 &&
      this.selectedSizes.length > 0 &&
      this.productform.valid
    );
  }
}
