import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ProfileInformation } from './profile-complete-information';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileInformation:ProfileInformation ;
  email:string;
  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {   
    this.profileInformation = {
        email : '',
        programmingSkills : [],
        score : 0.0,
        solvedProblems : 0,
        badge:"",
        profilePictureUri:"",
        updatable : {
          fullName : '',
          mobile : '',
          cgpa : 0.0,
          experienceInYears : 0,
          additionalDetails : '',
          organization: '',
          passedOutYear : 9999,
          profession : '',
          qualification :  '',
          university : ''
        }
    };
    this.profileService.getProfileInformation().subscribe(response => {
      console.log(response);
      this.profileInformation = response;
    });
  }

  updateProfile() {
      
      console.log(this.profileInformation);
      this.profileService.updateProfile(this.profileInformation.updatable).subscribe( response => {
        if(response)
          console.log("Updated profile");
        else
          console.log("Fail to update profile");
      });
  }

}
