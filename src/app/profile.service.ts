import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';
import { ProfileInformation } from './profile-page/profile-complete-information';
import { UpdatableProfileDetails } from './profile-page/profile-update-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getProfileInformation():Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(baseUrl + 'api/profile/get');
  }
  updateProfile(updatedDetails:UpdatableProfileDetails) :Observable<boolean>{
    return this.http.post<UpdatableProfileDetails>(baseUrl + 'api/profile/update', updatedDetails).
      pipe(map(response => {      
        console.log(response);
        return true;
      }));
  } 
}
