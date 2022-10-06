import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {} as Product;
  @Output() addToCart: EventEmitter<string> = new EventEmitter;
  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  add() {
    this.addToCart.emit(this.product._id)
  }

  productClickHandler() {
    this.router.navigate(['/product-detail', { id: this.product._id }], {
      relativeTo: this.route,
      skipLocationChange: true,
    });
  }
}
