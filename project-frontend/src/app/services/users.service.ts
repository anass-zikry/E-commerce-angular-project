import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user:User = {} as User;
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private http: HttpClient) {}
  get thisUser(){
    return this.user;
  }
  get LoginStatus(): boolean {
    return this.loggedIn;
  }
  get adminState() {
    return this.isAdmin;
  }
  // httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json','Accept':'*/*'})}
  signup(username: string, password: string) {
    let data = JSON.stringify({ username: username, password: password });
    return this.http.post(`${environment.websiteURL}/register`, data);
  }
  getUser(){
    this.http.get(`${environment.websiteURL}/user`).subscribe((response:any)=>{
      if(response.success){
        this.user._id = response.user._id;
        this.user.isActive = response.user.isActive;
        this.user.username = response.user.username;
      }
    })
  }
  adminSignup(username: string, password: string) {
    let data = JSON.stringify({ username: username, password: password });
    return this.http.post(`${environment.adminURL}/register`, data);
  }
  adminCheck() {
    return this.http.get(`${environment.adminURL}/verify-admin`);
  }
  setAdmin() {
    this.isAdmin = true;
  }
  login(username: string, password: string) {
    let data = JSON.stringify({ username: username, password: password });
    return this.http.post(`${environment.websiteURL}/login`, data)
  }
  getUsers() {
    return this.http.get(`${environment.adminURL}/list-users`);
  }
  storeToken(t: string): void {
    localStorage.setItem('token', t);
  }
  getToken(): string {
    let token = localStorage.getItem('token');
    if (!token) return 'false';
    return token;
  }
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.user = {} as User;
    this.isAdmin = false;
    
  }
  checkTokenExpire() {
    return this.http.get(`${environment.websiteURL}/verify-token`);
  }
  checkToken(): void {
    let currentToken = this.getToken();
    if (currentToken == 'false') {
      this.loggedIn = false;
      return;
    }
    this.checkTokenExpire().subscribe((response: any) => {
      if (response.expired) {
        this.loggedIn = false;
      } else if (response.success) {
        this.loggedIn = true;
        this.adminCheck().subscribe((response: any) => {
          if (response.isAdmin) {
            this.setAdmin();
          }
          console.log(response);
          
        });
      }
      console.log(response);
    });
  }

  // isLoggedin(): Observable<boolean> {
  //   let currentToken = this.getToken();
  //   let x: boolean = false;
  //   let subject = new Subject<boolean>();
  //   if (currentToken == 'false') {
  //     this.loggedIn = false;
  //     subject.next(this.loggedIn)
  //     return subject.asObservable();
  //   } else {
  //     this.checkTokenExpire().subscribe((response: any) => {

  //       if(response.expired){x=false;subject.next(x)}
  //       else if(response.success){x=true;subject.next(x);this.loggedIn=true}
  //       // x = response;
  //       // console.log(response);
  //     });

  //     return subject.asObservable();
  //   }
  //   // console.log(x);

  //   // return x;
  // }
  setLoggedIn() {
    this.loggedIn = true;
  }
}
