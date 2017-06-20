import { Component, OnInit, NgZone } from '@angular/core';
import { Accommodation } from '../accommodation/accommodation.model';
import { Place } from '../place/place.model';
import { AppUser } from '../appuser/appuser.model';
import { AccommodationType } from '../accommodation-type/accommodation-type.model';
import { AccommodationTypeListService } from '../accommodation-type-list/accommodation-type-list.service';
import { PlaceListService } from '../place-list/place-list.service';
import { BanManagerService } from '../ban-manager/ban-manager.service';
import {AccommodationService} from './accommodation-list.service';

@Component({
  selector: 'accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  styles: ['agm-map {height: 300px; width: 500px;}'], //postavljamo sirinu i visinu mape
  providers:[AccommodationService,PlaceListService,AccommodationTypeListService,BanManagerService] //dodali servis
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

  manager : AppUser;
  file: File;

   constructor(private accService: AccommodationService, private placeService: PlaceListService, private accTypeService: AccommodationTypeListService, private banService: BanManagerService) { 

    this.accommodations = [];
    this.places = [];
    this.accTypes = [];
    this.manager = new AppUser;
  }

  ngOnInit() {

    let token = localStorage.getItem("token");
    let id = JSON.parse(token).id;
    this.banService.getManagerById(id).subscribe(x => 
    {
      this.manager = x.json();
    });
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
    if((!isNaN(this.Latitude)) && (!isNaN(this.Longitude))){
        this.accService.create(new Accommodation(1, this.Name, this.Description, this.Address, this.AvargeGrade, this.Latitude, this.Longitude, "", false, this.SelectedPlace.Id, this.SelectedAccType.Id, +userID), this.file).subscribe(res => this.accommodations.push(res.json()));
    }
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
    }

  
  isBaned(){

    return !this.manager.Baned;
  }
}
