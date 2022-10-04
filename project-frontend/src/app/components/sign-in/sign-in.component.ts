import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  status: string = '';
  constructor(private user: UsersService, private router: Router) {}

  ngOnInit(): void {}
  signIn(): void {
    this.user.login(this.username, this.password).subscribe((response: any) => {
      // console.log(response);
      if (response.status) {
        this.user.storeToken(response.token.toString());
        this.user.setLoggedIn();
        this.user.adminCheck().subscribe((response: any) => {
          if (response.isAdmin) {
            this.user.setAdmin();
          } else {
            this.status = response.message;
          }
        });
        this.router.navigate(['']);
      } else {
        this.status = response.message;
      }
    });
  }
}
