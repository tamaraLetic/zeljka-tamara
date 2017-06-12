
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Place} from '../place/place.model';
import {Region} from '../region/region.model';
import {PlaceListService} from './place-list.service';
import {RegionService} from '../region-list/region-list.service';

@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers:[RegionService, PlaceListService] //dodali servis
})
export class PlaceListComponent implements OnInit {

  regions: Region [];
  name: string;
  id: number;
  places: Place [];
  selectedRegion: Region;

  @Output()select: EventEmitter<string>;

   constructor(private regionService: RegionService, private placeService: PlaceListService) { 

    this.regions=[]  
    this.places=[]
    this.select = new EventEmitter();
  }

  ngOnInit() {

    this.placeService.getAll().subscribe(res => this.places = res.json());
    this.regionService.getAll().subscribe(res => this.regions = res.json());
  }

  onSubmit(){

    this.placeService.create(new Place(1, this.name, this.selectedRegion.Id)).subscribe(res => this.places.push(res.json()));
  }

  deletePlace(id: number){

    
    this.placeService.delete(id).subscribe(res => this.places.splice(this.findIndex(res.json() as Place),1));
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

  findIndex(place: Place): number{
    for(let i =0; i<=this.places.length; i++){
      if(this.places[i].Id==place.Id){
        return i;
      }
    }
    return -1;
  }

}
