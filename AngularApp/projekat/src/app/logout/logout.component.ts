import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {LogoutService} from './logout.service';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
   providers:[LogoutService, AuthService]
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService, private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){  
    this.logoutService.logout().subscribe(/*x => {this.authService.logOut(x); this.router.navigate(['/home'])}*/); 
  }
}
