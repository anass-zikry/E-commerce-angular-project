import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
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
  constructor(private user: UsersService, private router: Router,private cartService:CartService) {}

  ngOnInit(): void {}
  signIn(): void {
    this.user.login(this.username, this.password).subscribe((response: any) => {
      // console.log(response);
      if (response.success) {
        this.user.storeToken(response.token.toString());
        this.user.setLoggedIn();
        this.user.getUser();
        this.user.checkToken();
        this.cartService.getCart();
        this.router.navigate(['']);
      } else {
        this.status = response.message;
      }
    });
  }
}
