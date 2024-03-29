import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { LoginRequestPayload } from './login/login-request.payload';
import { LoginResponsePayload } from './login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { Output, EventEmitter } from '@angular/core';
import { ProfileInformation } from './profile-page/profile-complete-information';
import {UpdatableProfileDetails} from './profile-page/profile-update-request';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();   
  private pointsSource = new Subject<number>();
  private baseUrl:string = environment.baseUrl;
  points$ = this.pointsSource.asObservable();

   refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private http:HttpClient, private localStorageService: LocalStorageService) {  }



  signup(data:String) : Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/register', data);
  }
  login(data:LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(this.baseUrl + 'api/auth/login', data).pipe(map(response => {      
      this.localStorageService.store('authenticationToken', response.authenticationToken);
      this.localStorageService.store('username', response.username);
      this.localStorageService.store('expiresAt', response.expiresAt);
      this.localStorageService.store('refreshToken', response.refreshToken);      

      this.loggedIn.emit(true);
      this.username.emit(response.username);      
      this.setPointsForUser(response.score);
      return true;
    }));      
  }

  getJwtToken() {
    return this.localStorageService.retrieve('authenticationToken');
  }
  getRefreshToken() {
    return this.localStorageService.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  resendVerificationMail(email:string) {
    console.log("Requesting to resend verification mail for email id " + email);
    if(email !== '') {
      this.http.get(this.baseUrl+'api/auth/account-verification/send-verification-email?email=' + email).subscribe(response => console.log(response));
    }
  }

  logout() {
    if(this.refreshTokenPayload.refreshToken !== '') {
      
    
     this.http.post(this.baseUrl + 'api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    }
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('expiresAt');
    this.localStorageService.clear('score');
  }

  getUserName() {
    return this.localStorageService.retrieve('username');
  }


  setPointsForUser(points:number) {
    this.pointsSource.next(points);
  }

}
