import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {
  @Input() brandTitle:string = '';
  @Output() deleteEmitter:EventEmitter<string> = new EventEmitter();
  delConfirm: boolean = false;
  @Input() delState:string = '';
  constructor() { }

  ngOnInit(): void {
  }
  confirmDelete(){
    this.delConfirm = true;
  }
  deleteBrand(){
    this.deleteEmitter.emit(this.brandTitle);
  }
  cancelDelete(){
    this.delConfirm = false;
  }
}
