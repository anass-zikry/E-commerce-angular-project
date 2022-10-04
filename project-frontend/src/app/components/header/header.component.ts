import { Component, OnInit, ChangeDetectionStrategy, Input, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private user:UsersService, private router:Router) {
    this.user.checkToken();
  }
  getLoggedIn():boolean{
    return this.user.LoginStatus;
  }
  getIsAdmin(){
    return this.user.adminState;
  }
  ngOnInit(): void {
  }
  
  logout(){
    this.user.deleteToken();
  }
  select(event:any){
    if(event.target.value == 'logout'){
      this.user.deleteToken();
      event.target.value = "/";
    }
    this.router.navigateByUrl(event.target.value);
  }
}
