import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {RegisterAppUserService} from './register-appuser.service';

@Component({
  selector: 'register-appuser',
  templateUrl: './register-appuser.component.html',
  styleUrls: ['./register-appuser.component.css'],
  providers:[RegisterAppUserService] //dodali servis
})

export class RegisterAppuserComponent implements OnInit {

  user: User;
  email: string;
  pass: string;
  conPass: string;
  name: string;
  surname: string;

  constructor(private registerAppUserService: RegisterAppUserService) { }

  ngOnInit() {
   
  }

  onSubmit(){
    this.registerAppUserService.create(new User(this.email, this.pass, this.conPass, this.name, this.surname, "AppUser")).subscribe();

  }

}
