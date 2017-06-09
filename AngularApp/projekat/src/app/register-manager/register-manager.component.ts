import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {RegisterManagerService} from './register-manager.service';

@Component({
  selector: 'register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css'],
  providers:[RegisterManagerService] //dodali servis
})
export class RegisterManagerComponent implements OnInit {

  user: User;
  email: string;
  pass: string;
  conPass: string;
  name: string;
  surname: string;

  constructor(private registerManagerService: RegisterManagerService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.registerManagerService.create(new User(this.email, this.pass, this.conPass, this.name, this.surname, "Manager")).subscribe();

  }
  
  
}
