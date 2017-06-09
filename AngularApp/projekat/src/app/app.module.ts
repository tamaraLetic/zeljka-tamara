import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterAppuserComponent } from './register-appuser/register-appuser.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';

import { AuthService } from './auth.service';

import { LoggedInGuard } from './logged-in.guard'

const Routes = [
  {path: "login", component: LoginComponent},
  {path: "countryList", component: CountryListComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryComponent,
    LoginComponent,
    UserComponent,
    RegisterAppuserComponent,
    RegisterManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
