import { Component, Output } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-frontend';
  // @Output() loggedIn:boolean = this.user.isLoggedin();
  // constructor(private user:UsersService){console.log(this.loggedIn);
  // }
}
