import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Room} from '../room/room.model';
import {Accommodation} from '../accommodation/accommodation.model';
import {RoomListService} from './room-list.service';
import { Router, ActivatedRoute } from "@angular/router";
import {AccommodationService} from '../accommodation-list/accommodation-list.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers:[RoomListService, AccommodationService]
})
export class RoomListComponent implements OnInit {

  rooms: Room[];
  accommodations: Accommodation[];
  selectedAccommodation: Accommodation;
  roomNum: number;
  bedCount: number;
  description: string;
  pricePerNight: number;

  id: number = -1;

 @Output()select: EventEmitter<string>;
  constructor(private roomService: RoomListService, private accommodationService: AccommodationService,private router: Router, private activatedRoute: ActivatedRoute) {
    this.rooms=[];
    this.accommodations=[];
    this.select=new EventEmitter();
    this.selectedAccommodation = new Accommodation();
   }

  ngOnInit() {
    let token = localStorage.getItem("token");
    let userId = JSON.parse(token).id;
    this.accommodationService.getAllManagerAcc(userId).subscribe(res=>this.accommodations = res.json());

    this.activatedRoute.params.subscribe(params => {this.id = parseInt(params["Id"])});
    this.roomService.getAllAcc(this.id).subscribe(res => 
    {
      this.rooms = res.json();
      this.accommodationService.getById(this.id).subscribe(x => 
      {
        this.selectedAccommodation = x[0];
      });
    });
  }
  onSubmit(){

    this.roomService.create(new Room(1, this.roomNum, this.bedCount, this.description, this.pricePerNight, this.selectedAccommodation.Id)).subscribe(res => this.rooms.push(res.json()));
  }

  deletePlace(id: number){

    
    this.roomService.delete(id).subscribe(res => this.rooms.splice(this.findIndex(res.json() as Room),1));
  }

  hasRight(accId: number): boolean{

    let token = localStorage.getItem("token");
    let id = JSON.parse(token).id;
    let auth = false;

    let acc = this.accommodations.filter(x => x.Id == accId)[0];

    if (acc)
    {
      if ((acc as Accommodation).AppUserId === +id)
      {
          auth = true;
      }
    }

    return auth;
  }

  findIndex(room: Room): number{
    for(let i =0; i<=this.rooms.length; i++){
      if(this.rooms[i].Id==room.Id){
        return i;
      }
    }
    return -1;
  }
} 
