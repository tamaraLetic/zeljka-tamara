
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Region} from '../region/region.model';
import {Country} from '../country/country.model';
import {RegionService} from './region-list.service';
import {CountryListService} from '../country-list/country-list.service';

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers:[RegionService, CountryListService] //dodali servis
})

export class RegionListComponent implements OnInit {

  regions: Region [];
  Name: string;
  Id: number;
  Countries: Country [];
  SelectedCountry: Country;
  

  @Output()select: EventEmitter<string>;

   constructor(private regionService: RegionService, private countryService: CountryListService) { 

    this.regions=[]  
    this.Countries=[]
    this.select = new EventEmitter();
  }

  ngOnInit() {

    this.countryService.getAll().subscribe(res => this.Countries = res.json());
    this.regionService.getAll().subscribe(res => this.regions = res.json());
  }

  onSubmit(){

    this.regionService.create(new Region(1, this.Name, this.SelectedCountry.Id)).subscribe(res => this.regions.push(res.json()));
  }

  deleteRegion(id: number){

    this.regionService.delete(id).subscribe();
    this.regionService.getAll().subscribe(res => this.regions = res.json());
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

}
