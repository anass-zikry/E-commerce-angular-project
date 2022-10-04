import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core'
import { UsersService } from './users.service'


@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private user:UsersService){}
    token = this.user.getToken();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({headers:req.headers.set('Content-Type','application/json')})
        if(!this.token){return next.handle(req)}
        req = req.clone({headers:req.headers.set('Authorization',this.token)})
          
          return next.handle(req);
    }
}
// 'Content-Type' : 'application/json',