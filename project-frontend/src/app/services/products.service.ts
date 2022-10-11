import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Array<Product> = [];
  productMessage: string = '';
  constructor(private http: HttpClient) {
    this.retrieveProducts();
  }
  retrieveProducts() {
    return this.http
      .get(`${environment.websiteURL}/browse-products`)
      .subscribe((response: any) => {
        this.products = response;
      });
  }
  get thisProducts() {
    return this.products;
  }
  get addProductMessage() {
    return this.productMessage;
  }
  getProducts() {
    return this.products;
  }
  addProduct(product: Product) {
    this.http
      .post(`${environment.adminURL}/add-product`, {
        data: JSON.stringify(product),
      })
      .subscribe((response: any) => {
        if (response.success) {
          this.productMessage = response.message;
          this.retrieveProducts();
        }
        
      });
  }
  delete(id: string) {
    this.products.splice(
      this.products.findIndex((x) => x._id == id),
      1
    );
    return this.http.post(`${environment.adminURL}/del-product`,JSON.stringify({id:id}));
  }
  modifyProduct(product: Product) {
    this.http
      .post(
        `${environment.adminURL}/mod-product`,
        JSON.stringify({
          id: product._id,
          dataObj: {
            name: product.name,
            price: product.price,
            discountRatio: product.discountRatio,
            category: product.category,
            brand: product.brand,
            color: product.color,
            size: product.size,
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            imageUrl: product.imageUrl,
          },
        })
      )
      .subscribe((response: any) => {
        if (response.success) {
          this.productMessage = response.message;
        } else {
          this.productMessage = response.message;
        }
      });
  }
  getProductById(id: string | null): Product {
    let filtered = this.products.filter((p) => p._id == id);
    return filtered[0];
  }
  getFiltered(
    selectedPrices: number[],
    selectedColors: string[],
    selectedSizes: string[]
  ): Array<Product> {
    return this.products.filter((p) => {
      return (
        this.priceInRange(p.price * (1 - p.discountRatio), selectedPrices) &&
        this.colorInRange(p.color, selectedColors) &&
        this.sizeInRange(p.size, selectedSizes)
      );
    });
  }
  priceInRange(price: number, selectedPrices: number[]): boolean {
    if (selectedPrices.length == 0) return true;
    let exist: boolean = false;
    for (let p of selectedPrices) {
      if (price <= p && price >= p - 100) exist = true;
    }
    return exist;
  }
  colorInRange(color: string[], selectedColors: string[]): boolean {
    if (selectedColors.length == 0) return true;
    let exist: boolean = false;
    for (let productcolor of color) {
      for (let c of selectedColors) {
        if (productcolor == c) exist = true;
      }
    }
    return exist;
  }
  sizeInRange(size: string[], selectedSizes: string[]): boolean {
    if (selectedSizes.length == 0) return true;
    let exist: boolean = false;
    for (let productsize of size) {
      for (let s of selectedSizes) {
        exist = productsize == s;
      }
    }
    return exist;
  }
}
