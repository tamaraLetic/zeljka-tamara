import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user =this.isLoggedIn();


constructor(private authService: AuthService){
  }

  logIn(){
    //this.authService.logIn();
  }

  logOut(){
    this.authService.logOut();
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  isAdmin():boolean{

    return this.authService.isAdmin();
  }
}
