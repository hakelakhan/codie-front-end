import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomePageComponent } from './home-page/home-page.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { TokenInterceptor } from './token-interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    QuestionPageComponent,
    AceEditorComponent,
    LandingPageComponent,
    ProfilePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatFormFieldModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
