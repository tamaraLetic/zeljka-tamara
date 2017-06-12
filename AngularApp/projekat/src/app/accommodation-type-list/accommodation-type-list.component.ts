import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AccommodationType} from '../accommodation-type/accommodation-type.model';
import {AccommodationTypeListService} from "./accommodation-type-list.service";

@Component({
  selector: 'accommodation-type-list',
  templateUrl: './accommodation-type-list.component.html',
  styleUrls: ['./accommodation-type-list.component.css'],
  providers:[AccommodationTypeListService]
})
export class AccommodationTypeListComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  Name:string;
  SelectedAccommodationType: AccommodationType;

  @Output()select: EventEmitter<string>;
  constructor(private AccommodationTypeListService: AccommodationTypeListService) {
    this.accommodationTypes=[];
    this.select=new EventEmitter();

   }

  ngOnInit() {
    this.AccommodationTypeListService.getAll().subscribe(res => this.accommodationTypes=res.json());
  }
  onSubmit(){

    this.AccommodationTypeListService.create(new AccommodationType(1, this.Name)).subscribe(res => this.accommodationTypes.push(res.json()));
  }

  deleteAccommodationType(id: number){

    
    this.AccommodationTypeListService.delete(id).subscribe(res => this.accommodationTypes.splice(this.findIndex(res.json() as AccommodationType),1));
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

  findIndex(accommodationType: AccommodationType): number{
    for(let i =0; i<=this.accommodationTypes.length; i++){
      if(this.accommodationTypes[i].Id==accommodationType.Id){
        return i;
      }
    }
    return -1;
  }
}
