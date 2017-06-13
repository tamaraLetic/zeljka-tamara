import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Room} from '../room/room.model';
import {Accommodation} from '../accommodation/accommodation.model';
import {RoomListService} from './room-list.service';
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

 @Output()select: EventEmitter<string>;
  constructor(private roomService: RoomListService, private accommodationService: AccommodationService) {
    this.rooms=[];
    this.accommodations=[];
    this.select=new EventEmitter();
   }

  ngOnInit() {
    this.roomService.getAll().subscribe(res => this.rooms = res.json());
    this.accommodationService.getAll().subscribe(res=>this.accommodations = res.json());
  }
  onSubmit(){

    this.roomService.create(new Room(1, this.roomNum, this.bedCount, this.description, this.pricePerNight, this.selectedAccommodation.Id)).subscribe(res => this.rooms.push(res.json()));
  }

  deletePlace(id: number){

    
    this.roomService.delete(id).subscribe(res => this.rooms.splice(this.findIndex(res.json() as Room),1));
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

  findIndex(room: Room): number{
    for(let i =0; i<=this.rooms.length; i++){
      if(this.rooms[i].Id==room.Id){
        return i;
      }
    }
    return -1;
  }
} 
