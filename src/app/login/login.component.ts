import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({  
      email:new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  login() {
    if(this.formGroup?.valid) {
      this.authService.login(this.formGroup?.value).subscribe(result => {
        console.log(result);
        alert("Logged in");
      });
    }
  }
}
