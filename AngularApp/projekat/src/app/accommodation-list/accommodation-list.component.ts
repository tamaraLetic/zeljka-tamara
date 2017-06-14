import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from '../accommodation-type-list/accommodation-type-list.service';
import { PlaceListService } from '../place-list/place-list.service';
import {AccommodationService} from './accommodation-list.service';

@Component({
  selector: 'accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  styles: ['agm-map {height: 300px; width: 500px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,PlaceListService,AccommodationTypeListService] //dodali servis
})
export class AccommodationListComponent implements OnInit {

  accommodations : Accommodation [];
  Name: string;
  Description: string;
  Address: string;
  AvargeGrade: number;
  Latitude: number;
  Longitude: number;
  ImageURL: string;
  Approved: boolean;
  SelectedPlace: Place;
  SelectedAccType: AccommodationType;
  places: Place [];
  accTypes: AccommodationType [];

  file: File;

   constructor(private accService: AccommodationService, private placeService: PlaceListService, private accTypeService: AccommodationTypeListService) { 

    this.accommodations = [];
    this.places = [];
    this.accTypes = [];
  }

  ngOnInit() {

    this.accService.getAll().subscribe(res => 
    {
      this.accommodations = res.json();
      
    });
    this.placeService.getAll().subscribe(res => this.places = res.json());
    this.accTypeService.getAll().subscribe(res => this.accTypes = res.json());
  }

  onSubmit(){

    let token = localStorage.getItem("token");
    let userID = JSON.parse(token).id;
    this.accService.create(new Accommodation(1, this.Name, this.Description, this.Address, this.AvargeGrade, this.Latitude, this.Longitude, "", false, this.SelectedPlace.Id, this.SelectedAccType.Id, +userID), this.file).subscribe(res => this.accommodations.push(res.json()));
  }

  delete(id: number){

    
    this.accService.delete(id).subscribe(res => this.accommodations.splice(this.findIndex(res.json() as Accommodation),1));
  }

  hasRight(id: number): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let userID = JSON.parse(token).id;
    let auth = false;

    if (role == "Manager" && userID == id)
    {
      auth = true;
    }

    return auth;
  }

  findIndex(acc: Accommodation): number{
    for(let i =0; i<=this.accommodations.length; i++){
      if(this.accommodations[i].Id==acc.Id){
        return i;
      }
    }
    return -1;
  }

  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(this.file);
    }

}
