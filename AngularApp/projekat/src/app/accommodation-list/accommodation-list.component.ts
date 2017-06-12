import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Place } from '../place/place.model';
//import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import {AccommodationService} from './accommodation-list.service';

@Component({
  selector: 'accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers:[AccommodationService] //dodali servis
})
export class AccommodationListComponent implements OnInit {

  accomodations : Accommodation [];
  Name: string;
  Description: string;
  Address: string;
  AvargeGrade: number;
  Latitude: number;
  Longitude: number;
  ImageURL: string;
  Approved: boolean;
  SelectedPlace: Place;
  //SelectedAccType: AccommodationType;

   constructor(private accService: AccommodationService) { 

    this.accomodations=[]  
  }

  ngOnInit() {

    this.accService.getAll().subscribe(res => this.accomodations = res.json());
  }

  onSubmit(){

   // this.accService.create(new Accommodation(1, this.Name, this.Description, this.Address, this.AvargeGrade, this.Latitude, this.Longitude, "", false, this.SelectedPlace.Id, this.SelectedAccType.Id)).subscribe(res => this.accomodations.push(res.json()));
  }

  delete(id: number){

    
    this.accService.delete(id).subscribe(res => this.accomodations.splice(this.findIndex(res.json() as Accommodation),1));
  }

  hasRight(): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;

    if (role=="Manager")
    {
      auth = true;
    }

    return auth;
  }

  findIndex(acc: Accommodation): number{
    for(let i =0; i<=this.accomodations.length; i++){
      if(this.accomodations[i].Id==acc.Id){
        return i;
      }
    }
    return -1;
  }

}
