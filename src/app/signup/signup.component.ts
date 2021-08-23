import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginRequestPayload } from '../login/login-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup:FormGroup;
  registrationSuccess:boolean = false;  

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {       
      this.formGroup = new FormGroup({
        fullName: new FormControl('', [Validators.required]),
        email:new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
  }
  signup() {
    if(this.formGroup?.valid) {
      this.authService.signup(this.formGroup?.value).subscribe(result => {
        console.log(result);
        /*var loginRequestPayload:LoginRequestPayload = {
          email: this.formGroup?.get('email')?.value,
          password : this.formGroup?.get('password')?.value
        }
        this.login(loginRequestPayload);*/
        this.registrationSuccess = true;
      },
      error => {
          alert("Error occured while registering user" + error.value);
      });
    }
  }
  login(loginRequestPayload:LoginRequestPayload) : void {
      this.authService.login(loginRequestPayload).subscribe(result => {
        this.router.navigateByUrl('/home');        
      }, error => {
          alert("Error occured while registering user" + error.value);
      });
    }  
  resendVerificationMail():void {
    const email:string =  this.formGroup.get('email')?.value;

    this.authService.resendVerificationMail(email);

  }  

}
