import { Component, OnInit } from '@angular/core';
import {Country} from '../country/country.model';
import {CountryListService} from './country-list.service';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers:[CountryListService] //dodali servis
})
export class CountryListComponent implements OnInit {
  countries: Country []
  Name: string;
  Code:string;
  
  constructor(private countryService: CountryListService) { 
    this.countries=[]
    
  }

  ngOnInit() {

    this.countryService.getAll().subscribe(res => this.countries = res.json());
  }

  onSubmit(){

    this.countryService.create(new Country(1, this.Name, this.Code)).subscribe(res => this.countries.push(res.json()));
  }

  deleteCountry(id: number){

    
    this.countryService.delete(id).subscribe(res => this.countries.splice(this.findIndex(res.json() as Country),1));
  }

  hasRight(): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;

    if (role=="Admin")
    {
      auth = true;
    }

    return auth;
  }

  findIndex(country: Country): number{

    for(let i =0; i<=this.countries.length; i++){
      if(this.countries[i].Id==country.Id){
        return i;
      }
    }

    return -1;
  }
}
