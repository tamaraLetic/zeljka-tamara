<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
import {Region} from './region.model';

@Component({
  selector: 'region',
=======
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-region',
>>>>>>> 10c14769549929a9acc597d92844652695795a88
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
<<<<<<< HEAD
  @Input() region: Region
=======
>>>>>>> 10c14769549929a9acc597d92844652695795a88

  constructor() { }

  ngOnInit() {
  }

}
