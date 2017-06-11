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
  Uname: string;
  Password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.create(new User(this.Uname, this.Password)).subscribe();

  }
}
