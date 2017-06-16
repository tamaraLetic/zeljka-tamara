import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from '../accommodation-type-list/accommodation-type-list.service';
import { PlaceListService } from '../place-list/place-list.service';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';

@Component({
  selector: 'app-show-accommodations',
  templateUrl: './show-accommodations.component.html',
  styleUrls: ['./show-accommodations.component.css'],
   styles: ['agm-map {height: 300px; width: 500px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService] //dodali servis
})
export class ShowAccommodationsComponent implements OnInit {
  accommodations : Accommodation [];

  constructor(private accService: AccommodationService) { 
    this.accommodations = [];
  }

  ngOnInit() {
     this.accService.getAll().subscribe(res => 
    {
      this.accommodations = res.json();
      
    });
  }

}
