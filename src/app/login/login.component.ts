import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { LoginRequestPayload } from './login-request.payload';
import { Router} from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  loginRequestPayload: LoginRequestPayload
  errorWhileLoggingIn: boolean;
  constructor(private authService: AuthenticationService, private router: Router) {
    this.loginRequestPayload = {
      email : '',
      password : ''
    };
   }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({  
      email:new FormControl('hakelakhan@yahoo.com', [Validators.required]),
      password: new FormControl('Lakhan@1234', [Validators.required])
    });
  }
  login() {
    
      this.loginRequestPayload.email = this.formGroup.get('email')!.value;
      this.loginRequestPayload.password = this.formGroup.get('password')!.value;

      this.authService.login(this.loginRequestPayload).subscribe(result => {
        this.errorWhileLoggingIn = false;
        this.router.navigateByUrl('/home');        
      }, error => {
        this.errorWhileLoggingIn = true; throwError(error)
      });    
  }
}
