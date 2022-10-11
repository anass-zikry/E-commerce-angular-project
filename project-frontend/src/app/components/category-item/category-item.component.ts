import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() categoryTitle:string = '';
  @Output() deleteEmitter:EventEmitter<string> = new EventEmitter();
  delConfirm: boolean = false;
  @Input() delState:string = '';
  constructor() { }

  ngOnInit(): void {
  }
  confirmDelete(){
    this.delConfirm = true;
  }
  deleteCategory(){
    this.deleteEmitter.emit(this.categoryTitle);
  }
  cancelDelete(){
    this.delConfirm = false;
  }
}
