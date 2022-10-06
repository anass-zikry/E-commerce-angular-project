import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User = this.getUser();
  constructor(private users:UsersService) {
  }

  ngOnInit(): void {
  }
  getUser(){
    return this.users.thisUser;
  }
  getUsername(){
    return this.user.username;
  }
}
