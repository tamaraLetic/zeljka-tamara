import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Filter} from './filter/filter.model'
import {Accommodation} from './accommodation/accommodation.model'
import {FilterService} from './filter/filter.service'

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FilterService]

})
export class AppComponent {
  title = 'app';
  user =this.isLoggedIn();
  filterParams: Filter;
  acc : Accommodation [];


constructor(private authService: AuthService, private filter: FilterService){

    this.filterParams = new Filter();
    this.filterParams.AccName = "";
    this.filterParams.AccType = "";
    this.filterParams.BedCount = 0;
    this.filterParams.Country = "";
    this.filterParams.Grade = 0;
    this.filterParams.PageNum = 0;
    this.filterParams.Place = "";
    this.filterParams.PriceMax = 0;
    this.filterParams.PriceMin = 0;
    this.filterParams.Region = "";
    this.acc= [];
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
    isUser():boolean{

    return this.authService.isUser();
  }

  onSubmit(filter: Filter, form: any){

    this.filterParams = filter as Filter;
    this.filterParams.PageNum = 10;
    let filterEl = this.filter.generateQuery(filter);
    console.log(filterEl);
    this.filter.getAll(filterEl).subscribe(x => 
    {
      this.acc=x.json();
      console.log(this.acc);
    });
    console.log(this.acc);
  }
}
