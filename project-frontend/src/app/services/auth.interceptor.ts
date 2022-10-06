import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core'
import { UsersService } from './users.service'


@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private user:UsersService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.user.getToken();
        req = req.clone({headers:req.headers.set('Content-Type','application/json')})
        console.log(token == 'false');
        
        if(token == 'false'){return next.handle(req)}
        req = req.clone({headers:req.headers.set('Authorization',token)})
          
          return next.handle(req);
    }
}
// 'Content-Type' : 'application/json',