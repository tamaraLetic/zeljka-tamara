import { Component, OnInit , Input} from '@angular/core';
import {AccommodationType} from './accommodation-type.model';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css']
})
export class AccommodationTypeComponent implements OnInit {

  @Input() accommodationType: AccommodationType

  constructor() { }

  ngOnInit() {
  }

}
