import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: Product = {} as Product;
  delConfirm:boolean = false;
  delState:string = '';
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
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router:Router
  ) {
    if (this.getCategoryTitles.length == 0) {
      this.category.fetchCategories();
    }
    if (this.getBrandTitles().length == 0) {
      this.brand.fetchBrands();
    }
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(id);
  }
  // newProduct:Product = {}
  // newProduct: FormArray = new FormArray([
  //   new FormControl(this.product.name, {validators:[Validators.maxLength(30)]}),
  //   new FormControl(this.product.price, [Validators.min(0)]),
  //   new FormControl(this.product.discountRatio, [
  //     Validators.min(0),
  //     Validators.max(1),
  //   ]),
  //   category: new FormControl(this.product.category),
  //   brand: new FormControl(this.product.brand),
  //   color: new FormControl(this.product.color),
  //   size: new FormControl(this.product.size),
  //   isActive: new FormControl(this.product.isActive),
  //   isFeatured: new FormControl(this.product.isFeatured),
  //   imageUrl: new FormControl(this.product.imageUrl),
  // ]);
  activate: boolean = false;
  validateMessage: string = '';
  activateit() {
    this.activate = true;
  }
  getCategoryTitles() {
    return this.category.thisCategories;
  }
  getBrandTitles(): string[] {
    return this.brand.thisBrands.map((v, i) => {
      return v.title;
    });
  }
  getAvailableSize(): string[] {
    let avSize: string[] = [];
    this.sizes.map((x) => {
      let index = this.product.size.findIndex((y) => x == y);
      if (index < 0) {
        avSize.push(x);
      }
    });
    return avSize;
  }
  getAvailableColor(): string[] {
    let avColor: string[] = [];
    this.colors.map((x) => {
      let index = this.product.color.findIndex((y) => x == y);
      if (index < 0) {
        avColor.push(x);
      }
    });
    return avColor;
  }
  deleteSize(size: string) {
    this.product.size.splice(
      this.product.size.findIndex((x) => {
        return x == size;
      }),
      1
    );
  }
  addSize(event: any) {
    this.product.size.push(event.target.value);
  }
  deleteColor(color: string) {
    this.product.color.splice(
      this.product.color.findIndex((x) => {
        return x == color;
      }),
      1
    );
  }
  addColor(event: any) {
    this.product.color.push(event.target.value);
  }
  validate(): boolean {
    if (this.product.name.length <= 0) {
      this.validateMessage = 'Please enter product name';
      return false;
    }
    if (this.product.price <= 0) {
      this.validateMessage = 'Please enter a valid price';
      return false;
    }
    if (this.product.discountRatio < 0 || this.product.discountRatio > 1 || this.product.discountRatio == null) {
      this.validateMessage = 'Please enter a valid discount ratio';
      return false;
    }
    if (this.product.imageUrl.length <= 0) {
      this.validateMessage = 'Please enter product image url';
      return false;
    }
    return true;
  }
  submit() {
    if (this.validate()) {
      console.log(this.product);
      this.productService.modifyProduct(this.product)
    }
  }
  deleteMessage(){
    this.delConfirm = true;
  }
  deleteProduct(){
    this.productService.delete(this.product._id).subscribe((response:any)=>{
      if(response.success){
        this.router.navigateByUrl('/admin-browse-products');
      }
      else{
        this.delState = response.message;
      }
    });
    
  }
  cancelDeleteMessage(){
    this.delConfirm = false;
  }
}
