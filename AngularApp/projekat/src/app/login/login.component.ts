import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {LoginService} from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  token: Response

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit(){

    let response;
    response = this.loginService.create(new User(this.email, this.pass)).subscribe();
  }
}
