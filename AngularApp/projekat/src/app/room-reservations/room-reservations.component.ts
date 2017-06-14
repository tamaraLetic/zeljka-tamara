import { Component, OnInit, Input } from '@angular/core';
import {RoomReservations} from './room-reservations.model';

@Component({
  selector: 'room-reservations',
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {

  @Input() roomReservations: RoomReservations
  constructor() { }

  ngOnInit() {
  }

}
