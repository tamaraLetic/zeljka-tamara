import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Room } from '../room/room.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { Router, ActivatedRoute } from "@angular/router";
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import {AccommodationTypeListService} from '../accommodation-type-list/accommodation-type-list.service';

@Component({
  selector: 'app-show-accommodaton',
  templateUrl: './show-accommodaton.component.html',
  styleUrls: ['./show-accommodaton.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,AccommodationTypeListService] //dodali servis
})
export class ShowAccommodatonComponent implements OnInit {

  acc: Accommodation;
  id: number = -1;
  accType : AccommodationType;
  rooms: Room [];

  constructor(private accService: AccommodationService, private accTypeService: AccommodationTypeListService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.acc = new Accommodation();
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.accService.getById(this.id).subscribe(res => 
    {
      this.acc = res[0];
      this.rooms = res[0].Rooms;
      console.log(this.rooms);
    });
  }

}
