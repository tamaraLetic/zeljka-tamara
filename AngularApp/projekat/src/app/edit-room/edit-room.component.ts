import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Room} from '../room/room.model';
import {RoomListService} from '../room-list/room-list.service';
import 'rxjs/Rx';

@Component({
  selector: 'edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers:[RoomListService]
})
export class EditRoomComponent implements OnInit {
  room :Room;
  id: number=-1;

  @Output()select: EventEmitter<string>;
  constructor(private roomService: RoomListService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.room=new Room();
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{this.id=parseInt(params["Id"])});
    this.roomService.getById(this.id).subscribe(x => this.room = x  );
  }

  onSubmit(){
    this.roomService.update(this.room).subscribe(x=>this.router.navigate(['/room']));
  }
}
