import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Filter} from './filter/filter.model';
import {Accommodation} from './accommodation/accommodation.model';
import {FilterParamsService} from './filter-params.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'app';
  user =this.isLoggedIn();
  filterParams: Filter;


constructor(private authService: AuthService,private router: Router, private activatedRoute: ActivatedRoute){

  
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

   isManager():boolean{

    return this.authService.isManager();
  }

  onSubmit(filter: Filter, form: any){

    FilterParamsService.filterParams = filter;
    FilterParamsService.filterParams.PageNum = 10; 
    this.router.navigate(['/showAccommodations']);
  }
}
