<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "./accommodation.model"

@Component({
  selector: 'accommodation',
=======
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation',
>>>>>>> 10c14769549929a9acc597d92844652695795a88
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

<<<<<<< HEAD
  @Input() accommodation: Accommodation

=======
>>>>>>> 10c14769549929a9acc597d92844652695795a88
  constructor() { }

  ngOnInit() {
  }

}
