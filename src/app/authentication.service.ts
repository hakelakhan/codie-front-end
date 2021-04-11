import {baseUrl} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http:HttpClient) { }

  signup(data:String) : Observable<any> {
    return this.http.post(baseUrl + 'api/auth/register', data);
  }
}
