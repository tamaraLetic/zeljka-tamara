import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RoomReservations} from '../room-reservations/room-reservations.model';
import {Room} from '../room/room.model';
import {RoomListService} from '../room-list/room-list.service';
import {RoomReservationsListService} from './room-reservations-list.service';

@Component({
  selector: 'app-room-reservations-list',
  templateUrl: './room-reservations-list.component.html',
  styleUrls: ['./room-reservations-list.component.css'],
  providers: [RoomListService, RoomReservationsListService]
})
export class RoomReservationsListComponent implements OnInit {
  roomReservationss: RoomReservations[];
  startDate: Date;
  endDate: Date;
  id: number;
  rooms: Room[];
  selectedRooom: Room;

  @Output()select: EventEmitter<string>;

  constructor(private roomListService: RoomListService, private roomReservationsListService: RoomReservationsListService) { 
    this.roomReservationss=[];
    this.rooms=[];
    this.select=new EventEmitter();
  }

  ngOnInit() {
    this.roomReservationsListService.getAll().subscribe(res => this.roomReservationss=res.json());
    this.roomListService.getAll().subscribe(res=>this.rooms = res.json());

  }

  onSubmit(){
    let token=localStorage.getItem("token");
    let userId=JSON.parse(token).id;
    console.log(userId);
    console.log("Room id: ", this.selectedRooom.Id);
    this.roomReservationsListService.create(new RoomReservations(1, this.startDate, this.endDate,false, this.selectedRooom.Id, +userId)).subscribe(res => this.roomReservationss.push(res.json()));
 
  }

  deleteRoomReservations(id:number){
    this.roomReservationsListService.delete(id).subscribe(res=>this.roomReservationss.splice(this.findIndex(res.json() as RoomReservations),1));
  }

  hasRight(id:number): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;
    let userId = JSON.parse(token).id;
    console.log("Iz storage: ", userId);
    let rr=new RoomReservations();
    let userIdRoom=-1;

    //console.log(id);
    this.roomReservationsListService.getById(id).subscribe(x => rr = x  );
    userIdRoom=rr.AppUserId;
    console.log("iz baze: ", rr.AppUserId);

    if (role=="Manager")
    {
      if(userId==userIdRoom){
          auth = true;
      }
      
    }

    return auth;
  }

  findIndex(roomReservations: RoomReservations): number{
    for(let i =0; i<=this.roomReservationss.length; i++){
      if(this.roomReservationss[i].Id==roomReservations.Id){
        return i;
      }
    }
    return -1;
  }

}
