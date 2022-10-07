import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Output() addToCart: EventEmitter<string> = new EventEmitter();
  @Input() productClickEnable: boolean = true;
  @Input() buttonTitle:string = 'Add to cart';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
  add() {
    this.addToCart.emit(this.product._id);
  }

  productClickHandler() {
    if (this.productClickEnable) {
      this.router.navigate(['/product-detail', { id: this.product._id }], {
        relativeTo: this.route,
        skipLocationChange: true,
      });
    }
  }
}
