import { Component, OnInit } from '@angular/core';
import { ProfileInformation } from '../profile-page/profile-complete-information';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  profileService:ProfileService;
  profiles:ProfileInformation[];
  constructor(private ps:ProfileService) { 
    this.profileService = ps;
  }

  ngOnInit(): void {
    this.getTopProfies();
  }

  getTopProfies() {
    console.log("Hi");
    var count = 10;
    this.profileService.getTopProfiles(count).subscribe( response => {
      console.log(response);
      this.profiles = response;
    });
  }

}
