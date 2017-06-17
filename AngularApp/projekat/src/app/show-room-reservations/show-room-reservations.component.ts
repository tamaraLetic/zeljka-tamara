import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RoomReservations} from '../room-reservations/room-reservations.model';
import {Room} from '../room/room.model';
import {RoomListService} from '../room-list/room-list.service';
import {RoomReservationsListService} from '../room-reservations-list/room-reservations-list.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'show-room-reservations',
  templateUrl: './show-room-reservations.component.html',
  styleUrls: ['./show-room-reservations.component.css'],
  providers: [RoomListService, RoomReservationsListService]
})
export class ShowRoomReservationsComponent implements OnInit {
  roomReservationss: RoomReservations[];
 @Output()select: EventEmitter<string>;
  constructor(private router: Router,private roomReservationsListService: RoomReservationsListService,private activatedRoute: ActivatedRoute) {
    this.roomReservationss=[];
    this.select=new EventEmitter();
   }

  ngOnInit() {
     this.roomReservationsListService.getAll().subscribe(res => this.roomReservationss=res.json());
  }
    deleteRoomReservations(id:number){
    this.roomReservationsListService.delete(id).subscribe(res=>this.roomReservationss.splice(this.findIndex(res.json() as RoomReservations),1));
  }

  cancelRoomReservations(rr:RoomReservations){
    rr.Reserved=false;
    this.roomReservationsListService.update(rr).subscribe(x=>this.router.navigate(['/showRoomReservations']));
  /*  this.roomReservationsListService.getById(id).subscribe(x => {rr = x ;
      rr.Reserved=false;
      this.roomReservationsListService.update(rr).subscribe(x=>this.router.navigate(['/roomReservations']));
      this.roomReservationss.
    });*/
  }

    hasRight(id:number, reserved: boolean): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;
    let userId = JSON.parse(token).id;
   
    if(reserved){
        if(role=="User" &&  userId==id){
        auth=true;
    }

    }
    
    return auth;
  }
  
    hasRightDelete(id:number, reserved: boolean): boolean{

    let token = localStorage.getItem("token");
    let role = JSON.parse(token).role;
    let auth = false;
    let userId = JSON.parse(token).id;
   
    if(role=="User" &&  userId==id){
      auth=true;
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
