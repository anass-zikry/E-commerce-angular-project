import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-browse-products',
  templateUrl: './admin-browse-products.component.html',
  styleUrls: ['./admin-browse-products.component.css'],
})
export class AdminBrowseProductsComponent implements OnInit {
  products:Array<Product> = [];
  constructor(private productService: ProductsService,private router:Router) {

    // this.productService.retrieveProducts().subscribe((response: any) => {
    //   this.products = response;
    // });
  }

  ngOnInit(): void {}
  getProducts(){
    return this.productService.thisProducts;
  }
  editHandler(productId:string){
    this.router.navigate(['/edit-product', { id: productId }], {
      // relativeTo: this.route,
      skipLocationChange: true,
    });
  }
}
