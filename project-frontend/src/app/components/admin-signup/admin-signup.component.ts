import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  username:string = '';
  password:string = '';
  status:string = ''

  constructor(private user:UsersService,private router:Router) { }

  ngOnInit(): void {
  }
  signup(){
    this.user.adminSignup(this.username,this.password).subscribe((response:any)=>{
      if(response.status){this.router.navigateByUrl('sign-in');}
      else{this.status=response.message}
      
    })
  }
}
