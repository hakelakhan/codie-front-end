import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomePageComponent} from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';



const routes: Routes = [
  
  {path: '', component: LandingPageComponent},
  {path: 'about', component: AboutusComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'questions/:id', component:QuestionPageComponent, canActivate : [AuthGuard]},  
  {path: 'profile', component:ProfilePageComponent, canActivate : [AuthGuard]},
  {path: 'home', component:HomePageComponent, canActivate : [AuthGuard]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
