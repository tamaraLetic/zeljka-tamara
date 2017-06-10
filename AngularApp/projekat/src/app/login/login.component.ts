import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {LoginService} from './login.service';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService, AuthService]
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  token: Response

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){

    
    this.loginService.create(new User(this.email, this.pass)).subscribe(x => {this.authService.logIn(x); this.router.navigate(['/home'])});

   
  }
}
