import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AccommodationType} from '../accommodation-type/accommodation-type.model';
import {AccommodationTypeListService} from '../accommodation-type-list/accommodation-type-list.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'edit-accommodation-type',
  templateUrl: './edit-accommodation-type.component.html',
  styleUrls: ['./edit-accommodation-type.component.css'],
  providers:[AccommodationTypeListService]

})
export class EditAccommodationTypeComponent implements OnInit {
  accommodationType: AccommodationType;
  name: string;
  id: number=-1;

@Output()select:EventEmitter<string>;
  constructor(private AccommodationTypeListService: AccommodationTypeListService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.accommodationType=new AccommodationType();
    activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.AccommodationTypeListService.getById(this.id).subscribe(x=> this.accommodationType=x.json());
}

  ngOnInit() {
  }

  onSubmit(){
    console.log();
    this.AccommodationTypeListService.update(this.accommodationType).subscribe(x=>this.router.navigate(['/accommodationType']));
 
 }
}
