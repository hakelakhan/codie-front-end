import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomePageComponent} from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { QuestionPageComponent } from './question-page/question-page.component';



const routes: Routes = [
  
  {path: '', component: LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'questions/:id', component:QuestionPageComponent, canActivate : [AuthGuard]},
  {path: 'home', component:HomePageComponent, canActivate : [AuthGuard]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
