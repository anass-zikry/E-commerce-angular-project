import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  allPrice: boolean = true;
  allColor: boolean = true;
  allSize: boolean = true;
  prices: number[] = [];
  colors: string[] = [];
  sizes: string[] = [];
  @Output() pricesEmitter: EventEmitter<number[]> = new EventEmitter();
  @Output() colorsEmitter: EventEmitter<string[]> = new EventEmitter();
  @Output() sizesEmitter: EventEmitter<string[]> = new EventEmitter();
  allColors: string[] = [
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
  allSizes: string[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  constructor() {}

  ngOnInit(): void {}

  priceHandler(price: number, event: any) {
    if(price != 0 ){
      this.allPrice = false;
    }
    if (event.target.checked) {
      this.prices.push(price);
    } else {
      let index = this.prices.findIndex((p) => p == price);
      if (!(index < 0)) {
        this.prices.splice(index, 1);
      }
    }
    if (price == 0 || this.allPrice) {
      if(!event.target.checked){
        this.allPrice = false;
      }
      else {
        this.pricesEmitter.emit([]);
        this.allPrice = true;
        return;
      }
      
    }
    this.pricesEmitter.emit(this.prices);
  }
  colorHandler(event: any) {
    if(event.target.value != 'allColor'){
      this.allColor=false;
    }
    if (event.target.checked) {
      this.colors.push(event.target.value);
    } else {
      let index = this.colors.findIndex((c) => c == event.target.value);
      if (!(index < 0)) {
        this.colors.splice(index, 1);
      }
    }
    if (event.target.value == 'allColor' || this.allColor) {
      if(!event.target.checked){
        this.allColor = false;
      }
      else{
        this.colorsEmitter.emit([]);
        this.allColor = true;
        return;
      }
      this.allColor = false;
    }
    this.colorsEmitter.emit(this.colors);
  }
  sizeHandler(event: any) {
    if(event.target.value != 'allSize'){
      this.allSize = false;
    }
    if (event.target.checked) {
      this.colors.push(event.target.value);
    } else {
      let index = this.sizes.findIndex((s) => s == event.target.value);
      if (!(index < 0)) {
        this.sizes.splice(index, 1);
      }
    }
    if (event.target.value == 'allSize' || this.allSize) {
      if(!event.target.checked){
        this.allSize = false
      }
      else{
        this.sizesEmitter.emit([]);
        this.allSize = true;
        return;
      }
      this.allSize = false;
    }
    this.sizesEmitter.emit(this.sizes);
  }
}
