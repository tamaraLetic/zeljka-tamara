import { Component, OnInit } from '@angular/core';
import {AccommodationService} from '../accommodation-list/accommodation-list.service';
import { Accommodation } from '../accommodation/accommodation.model';

@Component({
  selector: 'app-approve-accommodation',
  templateUrl: './approve-accommodation.component.html',
  styleUrls: ['./approve-accommodation.component.css'],
  providers: [AccommodationService]
})
export class ApproveAccommodationComponent implements OnInit {

  accommodations : Accommodation []

  constructor(private accService: AccommodationService) { 

    this.accommodations = [];
  }

  ngOnInit() {

    this.accService.getDissapproved().subscribe(res => 
    {
      this.accommodations = res.json();    
    });
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


  approve(acc: Accommodation){

    acc.Approved = true;
    this.accService.approve(acc).subscribe();
  }

  ifApproved(approved: boolean){

    if (approved)
    {
      console.log(approved);
      return true;

    }
    else
    {
      console.log(approved);
      return false;
    }
  }
}
