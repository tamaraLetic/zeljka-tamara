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
    this.Name="";
    this.Code="";
  }
}
