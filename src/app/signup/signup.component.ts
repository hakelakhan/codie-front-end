import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup:FormGroup;

  constructor(private authService: AuthenticationService) { }

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
        alert("Registered");
      });

    }
  }
  

}
