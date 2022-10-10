import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  pricesList:number[] = [];
  colorsList:string[] = [];
  sizesList:string[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  selectedPrices(prices:number[]){
    this.pricesList = prices;
  }
  selectedColors(colors:string[]){
    this.colorsList = colors;
  }
  selectedSizes(sizes:string[]){
    this.sizesList = sizes;
  }
  getPricesList(){
    return this.pricesList;
  }
  getColorsList(){
    return this.colorsList;
  }
  getSizesList(){
    return this.sizesList;
  }
}
