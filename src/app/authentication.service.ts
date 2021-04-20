import {baseUrl} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from './login/login-request.payload';
import { LoginResponsePayload } from './login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http:HttpClient, private localStorageService: LocalStorageService) { }

  signup(data:String) : Observable<any> {
    return this.http.post(baseUrl + 'api/auth/register', data);
  }
  login(data:LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(baseUrl + 'api/auth/login', data).pipe(map(response => {      
      this.localStorageService.store('authenticationToken', response.authenticationToken);
      this.localStorageService.store('email', response.email);
      this.localStorageService.store('expiresAt', response.expiresAt);
      this.localStorageService.store('refreshToken', response.refreshToken);      
      return true;
    }));      
  }

  getJwtToken() {
    return this.localStorageService.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
