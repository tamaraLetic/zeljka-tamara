import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RoomReservations} from '../room-reservations/room-reservations.model';
import {Room} from '../room/room.model';
import {RoomListService} from '../room-list/room-list.service';
import {RoomReservationsListService} from './room-reservations-list.service';
import { Router, ActivatedRoute } from "@angular/router";

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
  //rooms: Room[];
  //selectedRooom: Room;
    room :Room;
    idRoom: number=-1;
    allert:boolean;
    allert2:boolean;

  @Output()select: EventEmitter<string>;

  constructor(private router: Router,private roomListService: RoomListService, private roomReservationsListService: RoomReservationsListService, private activatedRoute: ActivatedRoute) { 
    this.roomReservationss=[];
   // this.rooms=[];
    this.select=new EventEmitter();
    this.room=new Room();
  }

  ngOnInit() {
    this.roomReservationsListService.getAll().subscribe(res => this.roomReservationss=res.json());
    //this.roomListService.getAll().subscribe(res=>this.rooms = res.json());
    this.activatedRoute.params.subscribe(params=>{this.id=parseInt(params["Id"])});
    this.roomListService.getById(this.id).subscribe(x => this.room = x  );
    this.allert=false;
    this.allert2=false;
  }

  onSubmit(){
    let token=localStorage.getItem("token");
    let userId=JSON.parse(token).id;
    //console.log(userId);
    //console.log("Room id: ", this.room.Id);
    this.allert=false;
    this.allert2=false;
    if(this.checkDate(this.startDate, this.endDate)){
      if(this.validateReservation(this.startDate, this.endDate, this.room.Id)){
          this.roomReservationsListService.create(new RoomReservations(1, this.startDate, this.endDate,true, this.room.Id, +userId)).subscribe(res => this.roomReservationss.push(res.json()));
          this.allert2=false;
          this.allert=false;
      }
      else{
        this.allert2=true;
        //alert("This room is not available in this period.");
      }
        
    }
    else{
        this.allert=true;
       // alert("Start date should be smaller than end date.");
    }
  }

  deleteRoomReservations(id:number){
    this.roomReservationsListService.delete(id).subscribe(res=>this.roomReservationss.splice(this.findIndex(res.json() as RoomReservations),1));
  }

  cancelRoomReservations(rr:RoomReservations){
    rr.Reserved=false;
    this.roomReservationsListService.update(rr).subscribe(x=>this.router.navigate(['/roomReservations/', rr.Id]));
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

  //checks if start date is smaller then end date
  checkDate(startDate: Date, endDate: Date):boolean{
    if(startDate && endDate){
      if(startDate>=endDate){
        return false;
      
      }
      return true;
    }
    else{
         return false;
    }
   
  }


//Checks if this room is taken in choosen period
  validateReservation(startDate: Date, endDate: Date, roomId:number):boolean{
    if(this.roomReservationss){
      for(let i=0; i<this.roomReservationss.length; i++){
        if(this.roomReservationss[i].RoomId==roomId){
            if(((startDate<=this.roomReservationss[i].EndDate)&&(startDate>= this.roomReservationss[i].StartDate)) || ((endDate>=this.roomReservationss[i].StartDate)&&(endDate<=this.roomReservationss[i].EndDate))){
              return false;
            }
            //else{
             //   return true;
            //}
        }
          
      }
      return true;
    }
      
  }
}
