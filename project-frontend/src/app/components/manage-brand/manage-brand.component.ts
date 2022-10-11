import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.css'],
})
export class ManageBrandComponent implements OnInit {
  newBrand: string = '';
  delState: string = '';
  addState: string = '';
  constructor(private brand: BrandService) {}

  ngOnInit(): void {}
  getBrandTitles() {
    return this.brand.thisBrands;
  }
  deleteBrand(title: string) {
    this.brand.delete(title).subscribe((response: any) => {
      if (response.success) {
        this.brand.fetchBrands();
      } else {
        this.delState = response.message;
      }
    });
  }
  addBrand() {
    if (!this.getValid()) {
      this.addState = 'Please enter a valid title';
    } else {
      this.addState = '';
      this.brand.add(this.newBrand).subscribe((response: any) => {
        if (response.success) {
          this.brand.fetchBrands();
          this.newBrand = '';
        } else {
          this.addState = response.message;
        }
      });
    }
  }
  getValid(): boolean {
    if (this.newBrand.length < 3) return false;
    return true;
  }
}
