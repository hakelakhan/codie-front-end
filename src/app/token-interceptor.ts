import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {    
    constructor(private authService:AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):        Observable<HttpEvent<any>> {
        if(req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        
        const jwtToken = this.authService.getJwtToken();
        if (jwtToken) {
            return next.handle(req.clone({headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)}));
        }
        return next.handle(req);
    }

}