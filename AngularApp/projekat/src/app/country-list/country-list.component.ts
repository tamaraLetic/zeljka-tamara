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
    this.countries=[
      //new Country(1, "Serbia","srb"), new Country(2, "USA", "usa")
      ]
    
  }

  ngOnInit() {
    //this.countries=this.countryService.getAll();
    this.countryService.getAll().subscribe(this.getAllCallback);
  }
//  onSubmit(country: Country){
  onSubmit(){
    //this.countries.push(new Country(2, this.Name, this.Code));
    this.countryService.create(new Country(2, this.Name, this.Code));
    this.Name="";
    this.Code="";
  }

  getAllCallback(data:any){
    this.countries=data.json();
  }
}
