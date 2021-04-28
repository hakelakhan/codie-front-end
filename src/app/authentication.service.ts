import {baseUrl} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from './login/login-request.payload';
import { LoginResponsePayload } from './login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();  

  constructor(private http:HttpClient, private localStorageService: LocalStorageService) { }

  signup(data:String) : Observable<any> {
    return this.http.post(baseUrl + 'api/auth/register', data);
  }
  login(data:LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(baseUrl + 'api/auth/login', data).pipe(map(response => {      
      this.localStorageService.store('authenticationToken', response.authenticationToken);
      this.localStorageService.store('username', response.username);
      this.localStorageService.store('expiresAt', response.expiresAt);
      this.localStorageService.store('refreshToken', response.refreshToken);      
      this.localStorageService.store('score', response.score);      
      

      this.loggedIn.emit(true);
      this.username.emit(response.username);      
      return true;
    }));      
  }

  getJwtToken() {
    return this.localStorageService.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('expiresAt');
    this.localStorageService.clear('score');
  }

  getUserName() {
    return this.localStorageService.retrieve('username');
  }
}
