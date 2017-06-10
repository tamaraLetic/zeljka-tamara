import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Accommodation } from '../accommodation/accommodation.model';
import {AccommodationService} from './accommodation-list.service';

@Component({
  selector: 'accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  providers:[AccommodationService] //dodali servis
})
export class AccommodationListComponent implements OnInit {

  accomodations : Accommodation [];
  Name: string;
  Description: string;
  Address: string;
  AvargeGrade: number;
  Latitude: number;
  Longitude: number;
  ImageURL: string;
  Approved: boolean;

   constructor(private accService: AccommodationService) { 

    this.accomodations=[]  
  }

  ngOnInit() {

    this.accService.getAll().subscribe(res => this.accomodations = res.json());
  }

  onSubmit(){

    this.accService.create(new Accommodation(1, this.Name, this.Description, this.Address, this.AvargeGrade, this.Latitude, this.Longitude, "", false)).subscribe(res => this.accomodations.push(res.json()));
  }

  editAccommodation(id: number){

    
  }

  deleteAccommodation(id: number){

    this.accService.delete(id).subscribe();
    this.accService.getAll().subscribe(res => this.accomodations = res.json());
  }
=======

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

>>>>>>> 10c14769549929a9acc597d92844652695795a88
}
